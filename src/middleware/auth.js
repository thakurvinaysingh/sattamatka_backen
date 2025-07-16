import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const header = req.headers.authorization?.split(' ');
  if (header?.[0] !== 'Bearer' || !header[1]) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  try {
    const decoded = jwt.verify(header[1], process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-Password'); // Use your field name
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const admin = (req, res, next) => {
  if (req.user.UserType !== 'admin') {   // <-- Use your actual user role field
    return res.status(403).json({ message: 'Admin only' });
  }
  next();
};

// *** Add this: ***
export const requireRole = (role) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  if (Array.isArray(role)) {
    if (!role.includes(req.user.UserType)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
  } else {
    if (req.user.UserType !== role) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
  }
  next();
};
