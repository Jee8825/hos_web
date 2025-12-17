const bcrypt = require('bcrypt');
const User = require('../model/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate phone number (10 digits starting with 6-9)
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return res.status(400).json({ message: 'Phone number must be 10 digits starting with 6, 7, 8, or 9.' });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }
    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one uppercase letter.' });
    }
    if (!/[a-z]/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one lowercase letter.' });
    }
    if (!/\d/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one number.' });
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one special character.' });
    }

    const existingEmail = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const existingPhone = await User.findOne({ phone: cleanPhone });
    if (existingPhone) {
      return res.status(400).json({ message: 'Phone number already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, passwordHash, phone: cleanPhone, role: role || 'user' });
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.passwordHash;

    req.io.emit('user:created', userResponse);
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Validate phone if provided
    if (phone) {
      const cleanPhone = phone.replace(/[\s\-()]/g, '');
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        return res.status(400).json({ message: 'Phone number must be 10 digits starting with 6, 7, 8, or 9.' });
      }
      user.phone = cleanPhone;
    }

    // Validate password if provided
    if (password) {
      if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters.' });
      }
      if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one uppercase letter.' });
      }
      if (!/[a-z]/.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one lowercase letter.' });
      }
      if (!/\d/.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one number.' });
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one special character.' });
      }
      user.passwordHash = await bcrypt.hash(password, 10);
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists.' });
      }
      user.email = email;
    }

    if (name) user.name = name;
    if (role) user.role = role;

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.passwordHash;

    req.io.emit('user:updated', userResponse);
    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    req.io.emit('user:deleted', { id });
    res.json({ message: 'User deleted successfully.', id });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
