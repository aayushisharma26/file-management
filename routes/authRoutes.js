import express from 'express';
import { login } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);

router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
