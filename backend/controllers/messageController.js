import { Message } from '../models/DataModels.js';

// @desc    Send a message or proposal to a creator
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req, res) => {
    try {
        const { receiverId, brief, budget, type } = req.body;
        
        const message = await Message.create({
            senderId: req.user.id,
            receiverId,
            brief,
            budget,
            type: type || 'message'
        });

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get messages for the logged in user (Dashboard view)
// @route   GET /api/messages
// @access  Private
export const getMyMessages = async (req, res) => {
    try {
        // Find messages where user is either sender or receiver
        const messages = await Message.find({
            $or: [{ receiverId: req.user.id }, { senderId: req.user.id }]
        }).populate('senderId', 'name').sort({ createdAt: -1 });
        
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
