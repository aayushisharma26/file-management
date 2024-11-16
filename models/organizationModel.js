const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema({
  orgName: { type: String, unique: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Organization", orgSchema);
