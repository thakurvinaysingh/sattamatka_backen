import mongoose from 'mongoose';

const ghadiSchema = new mongoose.Schema({
  GID: { type: Number, unique: true, required: true },
  NameEn: { type: String, required: true },
  NameHn: { type: String, required: true },
  RTime: { type: String, required: true },
  Result: { type: String },
  OrderId: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  CreatedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  CreatedOn: { type: Date, default: Date.now },
  ModifiedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  ModifiedOn: { type: Date, default: null }
});
export default mongoose.model('Ghadi', ghadiSchema);

