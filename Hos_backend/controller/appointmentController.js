const Appointment = require('../model/Appointment');
const User = require('../model/User');

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
    const { name, email, phone, serviceRef, date, time, status, details } = req.body;

    if (!name || !email || !phone || !serviceRef || !date || !time) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    const userAppointmentCount = await Appointment.countDocuments({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') },
      status: { $in: ['pending', 'postponed'] }
    });
    
    if (userAppointmentCount >= 6) {
      return res.status(400).json({ message: 'Maximum 6 active appointments allowed per user. Please complete or cancel existing appointments.' });
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
      phone,
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
    if (phone) appointment.phone = phone;
    if (serviceRef) appointment.serviceRef = serviceRef;
    if (date) appointment.date = date;
    if (time) appointment.time = time;
    if (details !== undefined) appointment.details = details;
    
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
