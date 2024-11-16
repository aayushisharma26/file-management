const multer = require("multer");
const path = require("path");
const File = require("../models/fileModel");
const Folder = require("../models/folderModel");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

exports.uploadFile = async (req, res) => {
  const { folderId, permissions } = req.body;

  try {
    const folder = await Folder.findById(folderId);
    if (!folder) return res.status(400).json({ message: "Folder not found." });

    const filePath = req.file.path;

    const newFile = new File({
      fileName: req.file.originalname,
      folderId,
      filePath,
      permissions
    });

    await newFile.save();
    res.status(201).json({ message: "File uploaded successfully", fileUrl: `/${filePath}` });
  } catch (err) {
    res.status(500).json({ message: "File upload failed." });
  }
};

// More file handling methods can be added (delete, retrieve, etc.)
