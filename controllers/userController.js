import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const signup = async (req, res) => {
  const { name, email, password, role, permissions } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const userExists = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || 'User';
    const userPermissions = permissions || [];

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole,
      permissions: userPermissions,
    });

    await user.save();

    return res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error('Server error:', err.message);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { name: user.name, email: user.email, role: user.role, permissions: user.permissions },
    });
  } catch (err) {
    console.error('Server error:', err.message);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, role, permissions } = req.body;
  
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'You are not authorized to create users' });
  }

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const userExists = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'User',
      permissions: permissions || [],
    });

    await newUser.save();
    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Server error:', err.message);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, role, permissions } = req.body;

  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'You are not authorized to update users' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.permissions = permissions || user.permissions;

    await user.save();
    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error('Server error:', err.message);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};




export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  // Check if the logged-in user is an Admin
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'You are not authorized to delete users' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Using delete() method to remove the user
    await User.deleteOne({ _id: userId })  // Alternative: await User.deleteOne({ _id: userId });
    
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Server error:', err.message);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

