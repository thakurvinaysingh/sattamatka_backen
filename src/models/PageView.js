import mongoose from 'mongoose';

const pageViewSchema = new mongoose.Schema({
  GID: { type: mongoose.Schema.Types.ObjectId, ref: 'Ghadi', default: null },
  PageType: { type: String, required: true },
  IPAddress: { type: String },
  UserAgent: { type: String },
  ViewedOn: { type: Date, default: Date.now }
});
export default mongoose.model('PageView', pageViewSchema);

