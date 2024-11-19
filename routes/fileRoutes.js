import express from 'express';
import multer from 'multer';
import {
  uploadFile,
  updateFile,
  retrieveFile,
  deleteFile,
} from '../controllers/fileController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), uploadFile);
router.put('/:fileId',  updateFile);
router.get('/:fileId',  retrieveFile);
router.delete('/:fileId', authenticate, deleteFile);

export default router;
