import express from 'express';
import { createSpace } from '../controllers/orgController.js';

const router = express.Router();
router.post('/secure-route', authenticate, checkPermissions(['CREATE_FILES']), createSpace);

export default router;
