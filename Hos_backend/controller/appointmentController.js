const Appointment = require('../model/Appointment');
const User = require('../model/User');
const { detectBookingConflicts, validateAppointmentLimit } = require('../utils/conflictDetection');

exports.getAllAppointments = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    
    const appointments = await Appointment.find(filter)
      .populate('serviceRef', 'title')
      .populate('userRef', 'name email')
      .sort({ scheduledAt: -1 });
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { name, email, phone, serviceRef, date, time, status, details, doctorId } = req.body;

    if (!name || !email || !phone || !serviceRef || !date || !time) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    // Validate phone number (10 digits starting with 6-9)
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return res.status(400).json({ message: 'Phone number must be 10 digits starting with 6, 7, 8, or 9.' });
    }

    // Check appointment limit
    const userAppointments = await Appointment.find({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    const limitCheck = validateAppointmentLimit(userAppointments, email);
    if (!limitCheck.isValid) {
      return res.status(400).json({ message: limitCheck.message });
    }

    // Check for conflicts if doctorId provided
    if (doctorId) {
      const existingAppointments = await Appointment.find({ doctorId });
      const conflictCheck = detectBookingConflicts(existingAppointments, { doctorId, appointmentDate: date, appointmentTime: time });
      if (conflictCheck.hasConflict) {
        return res.status(400).json({ message: conflictCheck.message });
      }
    }

    const convert12to24 = (time12h) => {
      const [time, modifier] = time12h.split(' ');
      let [hours, minutes] = time.split(':');
      if (hours === '12') hours = '00';
      if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
      return `${hours}:${minutes}`;
    };

    const time24 = convert12to24(time);
    const scheduledAt = new Date(`${date}T${time24}`);
    
    let userRef = null;
    const user = await User.findOne({ email });
    if (user) userRef = user._id;

    const appointment = new Appointment({
      userRef,
      name,
      email,
      phone: cleanPhone,
      serviceRef,
      date,
      time,
      status: status || 'pending',
      details,
      scheduledAt
    });

    await appointment.save();
    await appointment.populate('serviceRef', 'title');

    req.io.emit('appointment:created', appointment);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, serviceRef, date, time, status, details } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    const oldStatus = appointment.status;

    if (name) appointment.name = name;
    if (email) appointment.email = email;
    if (phone) {
      const cleanPhone = phone.replace(/[\s\-()]/g, '');
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        return res.status(400).json({ message: 'Phone number must be 10 digits starting with 6, 7, 8, or 9.' });
      }
      appointment.phone = cleanPhone;
    }
    if (serviceRef) appointment.serviceRef = serviceRef;
    if (date) appointment.date = date;
    if (time) appointment.time = time;
    if (details !== undefined) appointment.details = details;
    if (req.body.doctorId) appointment.doctorId = req.body.doctorId;
    
    if (status) {
      appointment.status = status;
      if (status === 'completed' && oldStatus !== 'completed') {
        appointment.completedAt = new Date();
      }
      if (status === 'cancelled' && oldStatus !== 'cancelled') {
        appointment.cancelledAt = new Date();
      }
    }

    if (date || time) {
      const convert12to24 = (time12h) => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') hours = '00';
        if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
        return `${hours}:${minutes}`;
      };
      const time24 = convert12to24(appointment.time);
      appointment.scheduledAt = new Date(`${appointment.date}T${time24}`);
    }

    appointment.updatedAt = new Date();
    await appointment.save();
    await appointment.populate('serviceRef', 'title');

    req.io.emit('appointment:updated', appointment);
    if (status && status !== oldStatus) {
      req.io.emit('appointment:statusChanged', { id, status, appointment });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    req.io.emit('appointment:deleted', { id });
    res.json({ message: 'Appointment deleted successfully.', id });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Bulk operations
exports.bulkUpdateAppointments = async (req, res) => {
  try {
    const { appointmentIds, updateData } = req.body;
    
    if (!appointmentIds || !Array.isArray(appointmentIds) || appointmentIds.length === 0) {
      return res.status(400).json({ message: 'Appointment IDs array is required.' });
    }

    const results = await Promise.allSettled(
      appointmentIds.map(async id => {
        const appointment = await Appointment.findById(id);
        if (!appointment) return null;
        
        // Set timestamps based on status change
        if (updateData.status === 'completed' && appointment.status !== 'completed') {
          updateData.completedAt = new Date();
        }
        if (updateData.status === 'cancelled' && appointment.status !== 'cancelled') {
          updateData.cancelledAt = new Date();
        }
        
        return Appointment.findByIdAndUpdate(
          id, 
          { ...updateData, updatedAt: new Date() }, 
          { new: true }
        ).populate('serviceRef', 'title');
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled').map(r => r.value);
    const failed = results.filter(r => r.status === 'rejected').length;

    // Emit socket events for successful updates
    successful.forEach(appointment => {
      if (appointment) {
        req.io.emit('appointment:updated', appointment);
      }
    });

    res.json({
      success: successful.length,
      failed,
      total: appointmentIds.length,
      appointments: successful
    });
  } catch (error) {
    res.status(500).json({ message: 'Bulk update failed.', error: error.message });
  }
};
