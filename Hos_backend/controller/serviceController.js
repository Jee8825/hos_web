const Service = require('../model/Service');
const Appointment = require('../model/Appointment');

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const { title, description, keyServices, iconName } = req.body;

    if (!title || !description || !iconName) {
      return res.status(400).json({ message: 'Title, description, and iconName are required.' });
    }

    const existingService = await Service.findOne({ title: { $regex: new RegExp(`^${title}$`, 'i') } });
    if (existingService) {
      return res.status(400).json({ message: 'A service with this title already exists.' });
    }

    const service = new Service({ title, description, keyServices: keyServices || [], iconName });
    await service.save();

    req.io.emit('service:created', service);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, keyServices, iconName } = req.body;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found.' });
    }

    if (title) service.title = title;
    if (description) service.description = description;
    if (keyServices) service.keyServices = keyServices;
    if (iconName) service.iconName = iconName;
    service.updatedAt = new Date();

    await service.save();

    req.io.emit('service:updated', service);
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const appointmentCount = await Appointment.countDocuments({ serviceRef: id });
    if (appointmentCount > 0) {
      return res.status(400).json({ 
        message: `Cannot delete service. ${appointmentCount} appointment(s) are linked to this service. Please reassign or delete them first.` 
      });
    }

    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found.' });
    }

    req.io.emit('service:deleted', { id });
    res.json({ message: 'Service deleted successfully.', id });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
