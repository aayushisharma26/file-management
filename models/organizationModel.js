import mongoose from 'mongoose';

const orgSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  subdomain: { type: String, required: true, unique: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Organization', orgSchema);
