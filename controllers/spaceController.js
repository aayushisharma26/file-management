import Space from '../models/spaceModel.js';

export const createSpace = async (req, res) => {
  const { name } = req.body;

  try {
    const space = await Space.create({ name, createdBy: req.user._id });
    res.status(201).json({ message: 'Space created successfully', space });
  } catch (error) {
    res.status(500).json({ message: 'Error creating space', error: error.message });
  }
};

export const getSpaces = async (req, res) => {
  try {
    const spaces = await Space.find({ createdBy: req.user._id });
    res.status(200).json({ spaces });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving spaces', error: error.message });
  }
};
