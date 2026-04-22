import express from 'express';
import { getAllUsers, getPlatformMetrics } from '../controllers/adminController.js';
import { protect, adminCheck } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/users').get(protect, adminCheck, getAllUsers);
router.route('/metrics').get(protect, adminCheck, getPlatformMetrics);

export default router;
