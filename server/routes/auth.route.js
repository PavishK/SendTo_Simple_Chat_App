import express from 'express';
import { login, register, logout, updateProfile, checkAuth } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.put("/update_profile", protectedRoute, updateProfile);
router.get('/check_auth', protectedRoute, checkAuth);

export default router;