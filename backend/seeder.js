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

        await User.deleteMany();
        await Creator.deleteMany();
        await Campaign.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash('password123', salt);

        // 1. Create Brands
        const brand1 = await User.create({ name: 'MuscleMax', email: 'muscle@max.com', password: pass, role: 'brand' });
        const brand2 = await User.create({ name: 'Nykaa Beauty', email: 'hello@nykaa.com', password: pass, role: 'brand' });

        // 2. Create Creators
        const creators = [
            { name: 'Rohan Fitness', email: 'rohan@example.com', hnd: 'rohan_fitness', niche: 'Fitness', er: 6.2, fol: 150000, plat: ['Instagram', 'YouTube'] },
            { name: 'Anya Sharma', email: 'anya@example.com', hnd: 'anya_travels', niche: 'Travel', er: 9.1, fol: 85000, plat: ['Instagram'] },
            { name: 'Tech Guru India', email: 'tech@guru.in', hnd: 'tech_guru', niche: 'Tech', er: 4.5, fol: 500000, plat: ['YouTube', 'Twitter'] },
            { name: 'Sneha Styles', email: 'sneha@styles.com', hnd: 'sneha_styles', niche: 'Fashion', er: 7.2, fol: 220000, plat: ['Instagram', 'YouTube'] },
            { name: 'Raj Finance', email: 'raj@finance.com', hnd: 'raj_finance', niche: 'Finance', er: 5.8, fol: 310000, plat: ['LinkedIn', 'Twitter'] }
        ];

        for (const c of creators) {
            const u = await User.create({ name: c.name, email: c.email, password: pass, role: 'creator' });
            await Creator.create({
                userId: u._id,
                handle: c.hnd,
                creatorType: 'Content Creator',
                niche: c.niche,
                platforms: c.plat,
                city: 'Mumbai',
                bio: 'Premium Indian Content Creator focused on building authentic brands.',
                followers: c.fol,
                er: c.er,
                score: Math.floor(c.er * 10),
                verified: c.fol > 100000,
                avatar: `https://ui-avatars.com/api/?name=${c.name.replace(' ', '+')}&background=random`,
                packages: [{ name: 'Dedicated Integration', price: Math.floor(c.fol * 0.1), desc: 'High quality dedicated placement' }]
            });
        }

        // 3. Create Campaigns
        await Campaign.create([
            { brandId: brand1._id, title: 'Summer Shred Supplement Review', budget: 15000, niche: 'Fitness', platforms: ['Instagram'], requirements: 'Create 1 high energy Reel using our pre-workout supplement.', status: 'open', slots: 5 },
            { brandId: brand2._id, title: 'Festive Makeup Lookbook', budget: 35000, niche: 'Fashion', platforms: ['YouTube', 'Instagram'], requirements: 'Dedicated YouTube integration reviewing our new festive palette.', status: 'open', slots: 3 },
            { brandId: brand1._id, title: 'Wireless Mic Tech Review', budget: 20000, niche: 'Tech', platforms: ['YouTube'], requirements: 'Looking for crisp audio reviews.', status: 'open', slots: 2 }
        ]);

        console.log('✅ Production Database Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('❌ Seeder Error:', error);
        process.exit(1);
    }
};

seedDB();
