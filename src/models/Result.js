import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  GID: { type: Number, required: true },
  DateTime: { type: Date, required: true },
  Result: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  CreatedById: { type: Number, default: null }, 
  CreatedOn: { type: Date, default: Date.now },
  ModifiedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  ModifiedOn: { type: Date, default: null }
});
export default mongoose.model('Result', resultSchema);
