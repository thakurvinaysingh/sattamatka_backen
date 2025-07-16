import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
  Image: { type: String, required: true },
  Content: { type: String },
  StartDate: { type: Date, required: true },
  EndDate: { type: Date, required: true },
  AdMId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdMaster', required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  CreatedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  CreatedOn: { type: Date, default: Date.now },
  ModifiedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  ModifiedOn: { type: Date, default: null }
});
export default mongoose.model('Ad', adSchema);

