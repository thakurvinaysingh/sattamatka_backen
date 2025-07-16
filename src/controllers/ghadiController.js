import Ghadi from '../models/Ghadi.js';

export const createGhadi = async (req, res, next) => {
  try {
    const doc = new Ghadi(req.body);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const getAllGhadis = async (req, res, next) => {
  try {
    const docs = await Ghadi.find({ isDeleted: false });
    res.json({ success: true, data: docs });
  } catch (err) { next(err); }
};

export const getGhadiById = async (req, res, next) => {
  try {
    const doc = await Ghadi.findById(req.params.id);
    if (!doc || doc.isDeleted)
      return res.status(404).json({ success: false, message: 'Ghadi not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const updateGhadi = async (req, res, next) => {
  try {
    const doc = await Ghadi.findByIdAndUpdate(
      req.params.id,
      { ...req.body, ModifiedOn: new Date() },
      { new: true, runValidators: true }
    );
    if (!doc || doc.isDeleted)
      return res.status(404).json({ success: false, message: 'Ghadi not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const deleteGhadi = async (req, res, next) => {
  try {
    const doc = await Ghadi.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, ModifiedOn: new Date() },
      { new: true }
    );
    if (!doc)
      return res.status(404).json({ success: false, message: 'Ghadi not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) { next(err); }
};

export const countGhadis = async (req, res, next) => {
    try {
      const count = await Ghadi.countDocuments({ isDeleted: false });
      res.json({ count });
    } catch (err) {
      next(err);
    }
  };