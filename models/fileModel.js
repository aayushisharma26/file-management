import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true },
  path: { type: String, required: true },
  permissions: { type: [String], default: [] },
});

export default mongoose.model('File', fileSchema);
