import File from '../models/fileModel.js';

export const uploadFile = async (req, res) => {
  const { folderId, permissions } = req.body;

  try {
    const file = await File.create({
      name: req.file.originalname,
      path: req.file.path,
      folder: folderId,
      permissions,
    });
    res.status(201).json({ message: 'File uploaded successfully', file });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
};

export const updateFile = async (req, res) => {
  const { fileId } = req.params;
  const { permissions } = req.body;

  try {
    const file = await File.findByIdAndUpdate(fileId, { permissions }, { new: true });
    res.status(200).json({ message: 'File updated successfully', file });
  } catch (error) {
    res.status(500).json({ message: 'Error updating file', error: error.message });
  }
};

export const retrieveFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId);
    res.status(200).json({ file });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving file', error: error.message });
  }
};

export const deleteFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    await File.findByIdAndDelete(fileId);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting file', error: error.message });
  }
};
