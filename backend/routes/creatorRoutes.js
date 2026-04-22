import express from 'express';
import { createProfile, getCreators, getCreatorById } from '../controllers/creatorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getCreators)
    .post(protect, createProfile);

router.route('/:id')
    .get(getCreatorById);

export default router;
