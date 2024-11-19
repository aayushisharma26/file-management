import express from 'express';
import { createFolder, deleteFolder } from '../controllers/folderController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',  createFolder);
router.delete('/:folderId', deleteFolder);

export default router;
