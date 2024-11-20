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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post('/upload', authenticate, upload.single('file'), uploadFile); 
router.put('/:fileId', authenticate, updateFile); 
router.get('/:fileId', authenticate, retrieveFile); 
router.delete('/:fileId', authenticate, deleteFile); 

export default router;