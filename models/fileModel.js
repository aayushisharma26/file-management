import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  permissions: { type: [String], default: [] }, // Make sure this field exists
});

export default mongoose.model('File', fileSchema);



