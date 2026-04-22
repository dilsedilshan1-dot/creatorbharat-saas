import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    budget: { type: Number, required: true },
    niche: { type: String, required: true },
    platforms: [{ type: String }],
    requirements: { type: String, required: true },
    status: { type: String, enum: ['open', 'in-progress', 'completed', 'closed'], default: 'open' },
    slots: { type: Number, default: 1 }
}, { timestamps: true });

export const Campaign = mongoose.model('Campaign', campaignSchema);

// Using the same file for brevity across message models as requested in generic Mongoose schemas
const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['proposal', 'message'], default: 'message' },
    budget: { type: Number }, // Only if proposal
    brief: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
}, { timestamps: true });

export const Message = mongoose.model('Message', messageSchema);
