import File from '../models/fileModel.js';

export const uploadFile = async (req, res) => {
  const { originalname, path } = req.file;

  try {
    const file = await File.create({
      name: originalname,
      path,
      createdBy: req.user._id,
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
    if (!permissions || !Array.isArray(permissions)) {
      return res.status(400).json({ message: "Permissions must be an array" });
    }

    const file = await File.findByIdAndUpdate(
      fileId,
      { permissions }, // Update permissions field
      { new: true } // return the updated file object
    );

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json({ message: 'File updated successfully', file });
  } catch (error) {
    res.status(500).json({ message: 'Error updating file', error: error.message });
  }
};


export const retrieveFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

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
