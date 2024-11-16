const express = require("express");
const { uploadFile } = require("../controllers/fileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/files", authMiddleware, upload.single("file"), uploadFile);

module.exports = router;
