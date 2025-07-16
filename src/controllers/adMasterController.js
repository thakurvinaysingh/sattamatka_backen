import AdMaster from '../models/AdMaster.js';

export const createAdMaster = async (req, res, next) => {
  try {
    const doc = new AdMaster(req.body);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const getAllAdMasters = async (req, res, next) => {
  try {
    const docs = await AdMaster.find({ isDeleted: false });
    res.json({ success: true, data: docs });
  } catch (err) { next(err); }
};

export const getAdMasterById = async (req, res, next) => {
  try {
    const doc = await AdMaster.findById(req.params.id);
    if (!doc || doc.isDeleted)
      return res.status(404).json({ success: false, message: 'AdMaster not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const updateAdMaster = async (req, res, next) => {
  try {
    const doc = await AdMaster.findByIdAndUpdate(
      req.params.id,
      { ...req.body, ModifiedOn: new Date() },
      { new: true, runValidators: true }
    );
    if (!doc || doc.isDeleted)
      return res.status(404).json({ success: false, message: 'AdMaster not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const deleteAdMaster = async (req, res, next) => {
  try {
    const doc = await AdMaster.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, ModifiedOn: new Date() },
      { new: true }
    );
    if (!doc)
      return res.status(404).json({ success: false, message: 'AdMaster not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) { next(err); }
};
