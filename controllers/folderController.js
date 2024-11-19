import Folder from '../models/folderModel.js';

export const createFolder = async (req, res) => {
  const { name, spaceId } = req.body;

  try {
    const folder = await Folder.create({ name, space: spaceId });
    res.status(201).json({ message: 'Folder created successfully', folder });
  } catch (error) {
    res.status(500).json({ message: 'Error creating folder', error: error.message });
  }
};

export const deleteFolder = async (req, res) => {
  const { folderId } = req.params;

  try {
    await Folder.findByIdAndDelete(folderId);
    res.status(200).json({ message: 'Folder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting folder', error: error.message });
  }
};
