import ContentBlock from '../models/ContentBlock.js';

// Utility: sanitize allowed fields
const pick = (obj, fields) => Object.fromEntries(fields.map(k => [k, obj[k]]));

export const createContentBlock = async (req, res, next) => {
  try {
    const { Title, Slug, Content } = req.body;
    if (!Title || !Slug || !Content) {
      return res.status(400).json({ success: false, message: 'Title, Slug, and Content are required.' });
    }
    const data = pick(req.body, [
      'Title', 'Slug', 'Content', 'isActive', 'isDeleted', 'CreatedById', 'CreatedOn', 'ModifiedById', 'ModifiedOn'
    ]);
    const exists = await ContentBlock.findOne({ Slug });
    if (exists) return res.status(409).json({ success: false, message: 'Slug must be unique.' });

    const doc = new ContentBlock(data);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (err) { next(err); }
};

// GET ALL, with optional pagination & filtering
export const getAllContentBlocks = async (req, res, next) => {
  try {
    const { page = 1, limit = 100, isActive } = req.query;
    const filter = { isDeleted: false };
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    const docs = await ContentBlock.find(filter)
      .sort({ CreatedOn: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);
    res.json({ success: true, data: docs });
  } catch (err) { next(err); }
};

// GET by ID
export const getContentBlockById = async (req, res, next) => {
  try {
    const doc = await ContentBlock.findById(req.params.id);
    if (!doc || doc.isDeleted)
      return res.status(404).json({ success: false, message: 'ContentBlock not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

export const getContentBlockBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const block = await ContentBlock.findOne({ Slug: slug, isDeleted: false });
    if (!block)
      return res.status(404).json({ success: false, message: 'ContentBlock not found' });
    res.json({ success: true, data: block });
  } catch (err) { next(err); }
};

// UPDATE by ID
export const updateContentBlock = async (req, res, next) => {
  try {
    const data = pick(req.body, [
      'Title', 'Slug', 'Content', 'isActive', 'ModifiedById', 'ModifiedOn'
    ]);
    data.ModifiedOn = new Date();
    const doc = await ContentBlock.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );
    if (!doc || doc.isDeleted)
      return res.status(404).json({ success: false, message: 'ContentBlock not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

// SOFT DELETE
export const deleteContentBlock = async (req, res, next) => {
  try {
    const doc = await ContentBlock.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, ModifiedOn: new Date() },
      { new: true }
    );
    if (!doc)
      return res.status(404).json({ success: false, message: 'ContentBlock not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) { next(err); }
};


// import ContentBlock from '../models/ContentBlock.js';

// export const createContentBlock = async (req, res, next) => {
//   try {
//     const doc = new ContentBlock(req.body);
//     await doc.save();
//     res.status(201).json({ success: true, data: doc });
//   } catch (err) { next(err); }
// };

// export const getAllContentBlocks = async (req, res, next) => {
//   try {
//     const docs = await ContentBlock.find({ isDeleted: false });
//     res.json({ success: true, data: docs });
//   } catch (err) { next(err); }
// };

// export const getContentBlockById = async (req, res, next) => {
//   try {
//     const doc = await ContentBlock.findById(req.params.id);
//     if (!doc || doc.isDeleted)
//       return res.status(404).json({ success: false, message: 'ContentBlock not found' });
//     res.json({ success: true, data: doc });
//   } catch (err) { next(err); }
// };

// export const updateContentBlock = async (req, res, next) => {
//   try {
//     const doc = await ContentBlock.findByIdAndUpdate(
//       req.params.id,
//       { ...req.body, ModifiedOn: new Date() },
//       { new: true, runValidators: true }
//     );
//     if (!doc || doc.isDeleted)
//       return res.status(404).json({ success: false, message: 'ContentBlock not found' });
//     res.json({ success: true, data: doc });
//   } catch (err) { next(err); }
// };

// export const deleteContentBlock = async (req, res, next) => {
//   try {
//     const doc = await ContentBlock.findByIdAndUpdate(
//       req.params.id,
//       { isDeleted: true, ModifiedOn: new Date() },
//       { new: true }
//     );
//     if (!doc)
//       return res.status(404).json({ success: false, message: 'ContentBlock not found' });
//     res.json({ success: true, message: 'Deleted successfully' });
//   } catch (err) { next(err); }
// };
