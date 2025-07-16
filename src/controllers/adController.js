import Ad from '../models/Ad.js';

export const createAd = async (req, res, next) => {
  try {
    const doc = new Ad(req.body);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const getAllAds = async (req, res, next) => {
  try {
    const docs = await Ad.find({ isDeleted: false }).populate('AdMId');
    res.json({ success: true, data: docs });
  } catch (err) { next(err); }
};

export const getAdById = async (req, res, next) => {
  try {
    const doc = await Ad.findById(req.params.id).populate('AdMId');
    if (!doc || doc.isDeleted)
      return res.status(404).json({ success: false, message: 'Ad not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const updateAd = async (req, res, next) => {
  try {
    const doc = await Ad.findByIdAndUpdate(
      req.params.id,
      { ...req.body, ModifiedOn: new Date() },
      { new: true, runValidators: true }
    );
    if (!doc || doc.isDeleted)
      return res.status(404).json({ success: false, message: 'Ad not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const deleteAd = async (req, res, next) => {
  try {
    const doc = await Ad.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, ModifiedOn: new Date() },
      { new: true }
    );
    if (!doc)
      return res.status(404).json({ success: false, message: 'Ad not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) { next(err); }
};
