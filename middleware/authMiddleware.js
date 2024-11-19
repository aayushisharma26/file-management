import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (err) {
    console.error('Authentication error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Permission denied. Admins only.' });
  }
  next();
};
