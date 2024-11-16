const express = require("express");
const { createFolder } = require("../controllers/folderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/folders", authMiddleware, createFolder);

module.exports = router;
