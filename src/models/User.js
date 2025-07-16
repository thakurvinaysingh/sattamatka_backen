import mongoose from 'mongoose';
import Counter from './Counter.js';
const userSchema = new mongoose.Schema({
  User_Id: { type: Number, unique: true },
  UserName: { type: String, unique: true , required: true },
  email: {
    type: String,
    unique: true,
    sparse: true // allows multiple nulls
  },
  DisplayName: { type: String, required: true },
  Password: { type: String, required: true },
  UserType: {
    type: String,
    enum: ['admin', 'agent'],
    default: 'agent',
    required: true
  },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  CreatedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  CreatedOn: { type: Date, default: Date.now },
  ModifiedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  ModifiedOn: { type: Date, default: null }
});

// Only increment on new docs
userSchema.pre('save', async function(next) {
    if (this.isNew) {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'User_Id' },
        { $inc: { seq: 1 } },
        { upsert: true, new: true }
      );
      this.User_Id = counter.seq;
    }
    next();
  });

export default mongoose.model('User', userSchema);

