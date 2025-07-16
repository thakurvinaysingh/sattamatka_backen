import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt          from 'jsonwebtoken';

// CREATE a new user
export const createUser = async (req, res, next) => {
    try {
      const exists = await User.findOne({ UserName: req.body.UserName });
      if (exists) return res.status(400).json({ success: false, message: 'Username already exists' });
  
      const doc = new User(req.body);
      await doc.save();
  
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
          id: doc._id,
          username: doc.UserName,
          tempPassword: req.body.Password  // 👈 For admin to send
        }
      });
    } catch (err) {
      next(err);
    }
  };


  export const loginUser = async (req, res, next) => {
    try {
      const { UserName, Password } = req.body;
  
      const user = await User.findOne({ UserName });
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid username or account inactive' });
      }
  
      if (user.Password !== Password) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
  
      // ✅ Generate JWT Token
      const token = jwt.sign(
        { id: user._id, role: user.UserType }, // payload
        process.env.JWT_SECRET,
        { expiresIn: '7d' } // token expiry
      );
  
      res.status(200).json({
        success: true,
        message: 'Login successful',
        token, // 👈 send token to frontend
        user: {
          id: user._id,
          displayName: user.DisplayName,
          userType: user.UserType
        }
      });
  
    } catch (err) {
      next(err);
    }
  };

// GET all users (with pagination, filtering, search)
export const getAllUsers = async (req, res, next) => {
  try {
    const {
      page = 1, limit = 20,
      isActive, userType, search
    } = req.query;

    const filter = { isDeleted: false };
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (userType) filter.UserType = userType;
    if (search) {
      filter.$or = [
        { UserName: { $regex: search, $options: 'i' } },
        { DisplayName: { $regex: search, $options: 'i' } }
      ];
    }

    const docs = await User.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ CreatedOn: -1 });

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: docs,
      pagination: { total, page: +page, pages: Math.ceil(total / limit) }
    });
  } catch (err) { next(err); }
};

// GET user by ID
export const getUserById = async (req, res, next) => {
  try {
    const doc = await User.findById(req.params.id);
    if (!doc || doc.isDeleted)
      return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

// UPDATE user by ID
export const updateUser = async (req, res, next) => {
  try {
    // Prevent updating sensitive fields if you need
    // delete req.body.Password;

    const doc = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, ModifiedOn: new Date() },
      { new: true, runValidators: true }
    );
    if (!doc || doc.isDeleted)
      return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

// SOFT DELETE user by ID
export const deleteUser = async (req, res, next) => {
  try {
    const doc = await User.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, ModifiedOn: new Date() },
      { new: true }
    );
    if (!doc)
      return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) { next(err); }
};

// GET active users (example for a special API)
export const getActiveUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isActive: true, isDeleted: false });
    res.json({ success: true, data: users });
  } catch (err) { next(err); }
};

export const countAgents = async (req, res, next) => {
    try {
      // If you only want agent users, filter by UserType
      const count = await User.countDocuments({ UserType: "agent", isDeleted: false });
      res.json({ count });
    } catch (err) {
      next(err);
    }
  };