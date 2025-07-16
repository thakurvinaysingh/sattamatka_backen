import mongoose from 'mongoose';

const userMapSchema = new mongoose.Schema({
  User_Id: { type: Number, required: true }, 
  GID: [{ type: Number, required: true }],
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  CreatedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  CreatedOn: { type: Date, default: Date.now },
  ModifiedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  ModifiedOn: { type: Date, default: null }
});
export default mongoose.model('UserMap', userMapSchema);

