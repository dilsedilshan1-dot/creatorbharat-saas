import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['creator', 'brand', 'admin'], required: true },
    createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);

const creatorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    handle: { type: String, required: true, unique: true },
    creatorType: { type: String, required: true },
    niche: { type: String, required: true },
    platforms: [{ type: String }],
    city: { type: String },
    bio: { type: String },
    followers: { type: Number, default: 0 },
    er: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    avatar: { type: String },
    packages: [{
        name: String,
        price: Number,
        desc: String
    }],
    totalViews: { type: Number, default: 0 }
}, { timestamps: true });

export const Creator = mongoose.model('Creator', creatorSchema);
