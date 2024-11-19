import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  space: { type: mongoose.Schema.Types.ObjectId, ref: 'Space', required: true },
});

export default mongoose.model('Folder', folderSchema);
