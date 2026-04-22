import { Creator } from '../models/User.js';

// @desc    Create creator profile
// @route   POST /api/creators
// @access  Private (Creators only)
export const createProfile = async (req, res) => {
    try {
        if (req.user.role !== 'creator') return res.status(403).json({ message: 'Brands cannot create creator profiles' });
        
        const existingProfile = await Creator.findOne({ userId: req.user.id });
        if (existingProfile) return res.status(400).json({ message: 'Profile already exists' });

        const profileData = { ...req.body, userId: req.user.id };
        const creator = await Creator.create(profileData);
        
        res.status(201).json(creator);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all creators (with filters & search)
// @route   GET /api/creators
// @access  Public
export const getCreators = async (req, res) => {
    try {
        const { search, niche, city, platform } = req.query;
        let query = {};

        if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }, { bio: { $regex: search, $options: 'i' } }];
        if (niche) query.niche = niche;
        if (city) query.city = city;
        if (platform) query.platforms = { $in: [platform] };

        // Auto sorting by score
        const creators = await Creator.find(query).sort({ score: -1 }).populate('userId', 'name email');
        res.json(creators);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single creator by ID
// @route   GET /api/creators/:id
// @access  Public
export const getCreatorById = async (req, res) => {
    try {
        const creator = await Creator.findById(req.params.id).populate('userId', 'name email');
        if (!creator) return res.status(404).json({ message: 'Creator not found' });
        
        // Background Tracking metric incrementation
        creator.totalViews += 1;
        await creator.save();

        res.json(creator);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
