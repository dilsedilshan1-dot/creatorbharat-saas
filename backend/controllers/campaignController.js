import { Campaign } from '../models/DataModels.js';

// @desc    Create a new campaign
// @route   POST /api/campaigns
// @access  Private (Brands only)
export const createCampaign = async (req, res) => {
    try {
        if (req.user.role !== 'brand') return res.status(403).json({ message: 'Only brands can create campaigns' });

        const campaign = await Campaign.create({ ...req.body, brandId: req.user.id });
        res.status(201).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all active campaigns
// @route   GET /api/campaigns
// @access  Public
export const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ status: 'open' })
            .populate('brandId', 'name email companyName')
            .sort({ createdAt: -1 });
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
