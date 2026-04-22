import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { User, Creator } from './models/User.js';
import { Campaign } from './models/DataModels.js';

dotenv.config();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        // Clear existing data to prevent conflicts
        await User.deleteMany();
        await Creator.deleteMany();
        await Campaign.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash('password123', salt);

        // 1. Create Super Admin
        await User.create({ name: 'System Admin', email: 'admin@creatorbharat.com', password: pass, role: 'admin' });

        // 2. Create Brands
        const brand1 = await User.create({ name: 'MuscleMax', email: 'muscle@max.com', password: pass, role: 'brand' });
        const brand2 = await User.create({ name: 'Nykaa Beauty', email: 'hello@nykaa.com', password: pass, role: 'brand' });

        console.log('✅ Admin & Brands Created. Production Ready Database Hydrated!');
        process.exit();
    } catch (error) {
        console.error('❌ Seeder Error:', error);
        process.exit(1);
    }
};

seedDB();
