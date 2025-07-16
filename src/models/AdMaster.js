import mongoose from 'mongoose';

const adMasterSchema = new mongoose.Schema({
  ColumnName: { type: String, required: true },
  ColumnPlacement: { type: String, required: true },
  Height: { type: Number },
  Width: { type: Number },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  CreatedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  CreatedOn: { type: Date, default: Date.now },
  ModifiedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  ModifiedOn: { type: Date, default: null }
});
export default mongoose.model('AdMaster', adMasterSchema);

