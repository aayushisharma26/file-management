import express from 'express';
import { createSpace, getSpaces } from '../controllers/spaceController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createSpace);
router.get('/', authenticate, getSpaces);

export default router;
