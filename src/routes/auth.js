// routes/user.js
import express from 'express';
import {
  register,
  login,
 
} from '../controllers/authController.js';

const router = express.Router();
router.post('/register',    register);
router.post('/verify-email', verifyEmail);
router.post('/login',       login);

export default router;