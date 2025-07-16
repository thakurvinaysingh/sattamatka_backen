import Result from '../models/Result.js';

export const createResult = async (req, res, next) => {
  try {
    const doc = new Result(req.body);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const getAllResults = async (req, res, next) => {
  try {
    const docs = await Result.find({ isDeleted: false }).populate('GID');
    res.json({ success: true, data: docs });
  } catch (err) { next(err); }
};

export const getResultById = async (req, res, next) => {
  try {
    const doc = await Result.findById(req.params.id).populate('GID');
    if (!doc || doc.isDeleted)
      return res.status(404).json({ success: false, message: 'Result not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const updateResult = async (req, res, next) => {
  try {
    const doc = await Result.findByIdAndUpdate(
      req.params.id,
      { ...req.body, ModifiedOn: new Date() },
      { new: true, runValidators: true }
    );
    if (!doc || doc.isDeleted)
      return res.status(404).json({ success: false, message: 'Result not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const deleteResult = async (req, res, next) => {
  try {
    const doc = await Result.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, ModifiedOn: new Date() },
      { new: true }
    );
    if (!doc)
      return res.status(404).json({ success: false, message: 'Result not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) { next(err); }
};

export const countResults = async (req, res, next) => {
    try {
      const count = await Result.countDocuments({ isDeleted: false });
      res.json({ count });
    } catch (err) {
      next(err);
    }
  };