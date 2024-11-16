const Folder = require("../models/folderModel");
const Organization = require("../models/organizationModel");

exports.createFolder = async (req, res) => {
  const { orgId, folderName } = req.body;

  try {
    const organization = await Organization.findById(orgId);
    if (!organization) return res.status(400).json({ message: "Organization not found." });

    const newFolder = new Folder({
      orgId,
      folderName,
      createdBy: req.user._id
    });

    await newFolder.save();
    res.status(201).json({ message: "Folder created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating folder" });
  }
};
