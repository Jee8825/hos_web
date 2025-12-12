const Message = require('../model/Message');
const User = require('../model/User');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('userRef', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    let userRef = null;
    const user = await User.findOne({ email });
    if (user) userRef = user._id;

    const newMessage = new Message({ userRef, name, email, phone, message });
    await newMessage.save();

    req.io.emit('message:created', newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, message } = req.body;

    const msg = await Message.findById(id);
    if (!msg) {
      return res.status(404).json({ message: 'Message not found.' });
    }

    if (name) msg.name = name;
    if (email) msg.email = email;
    if (phone) msg.phone = phone;
    if (message) msg.message = message;

    await msg.save();
    req.io.emit('message:updated', msg);
    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const msg = await Message.findByIdAndDelete(id);

    if (!msg) {
      return res.status(404).json({ message: 'Message not found.' });
    }

    req.io.emit('message:deleted', { id });
    res.json({ message: 'Message deleted successfully.', id });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
