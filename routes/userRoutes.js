import express from 'express';
import { signup, login, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/user', authenticate, authorizeAdmin, createUser);
router.put('/user/:userId', authenticate, authorizeAdmin, updateUser);
router.delete('/user/:userId', authenticate, authorizeAdmin, deleteUser);


export default router;






