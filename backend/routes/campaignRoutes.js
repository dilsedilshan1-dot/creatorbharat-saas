import express from 'express';
import { createCampaign, getCampaigns } from '../controllers/campaignController.js';
import { protect } from '../middleware/authMiddleware.js';

export const campaignRouter = express.Router();
campaignRouter.route('/').get(getCampaigns).post(protect, createCampaign);
