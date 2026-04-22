import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import creatorRoutes from './routes/creatorRoutes.js';
import { campaignRouter } from './routes/campaignRoutes.js';
import { messageRouter } from './routes/messageRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

// Secure Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected Logically'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err.message));

// Route Mounts
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/creators', creatorRoutes);
app.use('/api/campaigns', campaignRouter);
app.use('/api/messages', messageRouter);

app.get('/', (req, res) => res.send('CreatorBharat Production API is globally active and listening.'));
app.get('/health', (req, res) => res.status(200).json({ status: 'live', service: 'CreatorBharat Core API' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Production Server running natively on port ${PORT}`);
});
