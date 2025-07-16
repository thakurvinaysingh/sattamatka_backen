import User from '../models/User.js';
import Ghadi from '../models/Ghadi.js';
import UserMap from '../models/UserMap.js';

// CREATE: Combine User_Id and GID array in UserMap
export const createUserMap = async (req, res, next) => {
    try {
      let { User_Id, GID } = req.body;
  
      // Accept single number or array for GID
      if (typeof GID === 'number') {
        GID = [GID];
      }
      if (!Array.isArray(GID) || GID.length === 0 || GID.some(id => typeof id !== 'number')) {
        return res.status(400).json({ success: false, message: 'GID must be a number or a non-empty array of numbers.' });
      }
      if (typeof User_Id !== 'number') {
        return res.status(400).json({ success: false, message: 'User_Id must be a number.' });
      }
  
      // Check agent (user) exists
      const user = await User.findOne({ User_Id });
      if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
  
      // Check all ghadi exist
      const ghadiCount = await Ghadi.countDocuments({ GID: { $in: GID } });
      if (ghadiCount !== GID.length) {
        return res.status(400).json({ success: false, message: 'One or more GID do not exist.' });
      }
  
      // 1. Check if any GID is already assigned to ANY agent
      const alreadyAssigned = await UserMap.findOne({
        GID: { $in: GID },
        isActive: true,
        isDeleted: false
      });
      if (alreadyAssigned) {
        return res.status(400).json({ success: false, message: 'One or more ghadi in this list is already assigned to another agent.' });
      }
  
      // Create the UserMap (many ghadi to one agent)
      const doc = new UserMap({ User_Id, GID });
      await doc.save();
      res.status(201).json({ success: true, data: doc });
  
    } catch (err) {
      next(err);
    }
  };
  

// GET all UserMaps
export const getAllUserMaps = async (req, res, next) => {
  try {
    const docs = await UserMap.find({ isDeleted: false });
    res.json({ success: true, data: docs });
  } catch (err) { next(err); }
};

// GET UserMap by Mongo _id
export const getUserMapById = async (req, res, next) => {
  try {
    const doc = await UserMap.findById(req.params.id);
    if (!doc || doc.isDeleted)
      return res.status(404).json({ success: false, message: 'UserMap not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

// UPDATE UserMap by Mongo _id
export const updateUserMap = async (req, res, next) => {
  try {
    // Optionally, validate new User_Id and GID as in create
    const doc = await UserMap.findByIdAndUpdate(
      req.params.id,
      { ...req.body, ModifiedOn: new Date() },
      { new: true, runValidators: true }
    );
    if (!doc || doc.isDeleted)
      return res.status(404).json({ success: false, message: 'UserMap not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

// SOFT DELETE UserMap by Mongo _id
export const deleteUserMap = async (req, res, next) => {
  try {
    const doc = await UserMap.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, ModifiedOn: new Date() },
      { new: true }
    );
    if (!doc)
      return res.status(404).json({ success: false, message: 'UserMap not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) { next(err); }
};
