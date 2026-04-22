import { User, Creator } from '../models/User.js';
import { Campaign } from '../models/DataModels.js';

// @desc    Get all active platform users (Admin Only)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get complete high-level platform analytics
// @route   GET /api/admin/metrics
// @access  Private/Admin
export const getPlatformMetrics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeCampaigns = await Campaign.countDocuments({ status: 'open' });
        
        // Mock revenue logic (In real app, this queries Stripe/Razorpay models)
        const totalRevenue = activeCampaigns * 5000; 

        res.json({ totalUsers, activeCampaigns, totalRevenue, spamDetected: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
