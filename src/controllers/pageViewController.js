import PageView from '../models/PageView.js';

export const createPageView = async (req, res, next) => {
  try {
    const doc = new PageView(req.body);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const getAllPageViews = async (req, res, next) => {
  try {
    const docs = await PageView.find().populate('GID');
    res.json({ success: true, data: docs });
  } catch (err) { next(err); }
};

export const getPageViewById = async (req, res, next) => {
  try {
    const doc = await PageView.findById(req.params.id).populate('GID');
    if (!doc)
      return res.status(404).json({ success: false, message: 'PageView not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const updatePageView = async (req, res, next) => {
  try {
    const doc = await PageView.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!doc)
      return res.status(404).json({ success: false, message: 'PageView not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const deletePageView = async (req, res, next) => {
  try {
    const doc = await PageView.findByIdAndDelete(req.params.id);
    if (!doc)
      return res.status(404).json({ success: false, message: 'PageView not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) { next(err); }
};
