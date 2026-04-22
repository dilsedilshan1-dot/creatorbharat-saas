import express from 'express';
import { sendMessage, getMyMessages } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

export const messageRouter = express.Router();
messageRouter.route('/').get(protect, getMyMessages).post(protect, sendMessage);

export default messageRouter;
