const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileName: String,
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  filePath: String,
  permissions: Object
});

module.exports = mongoose.model("File", fileSchema);
