import axios from 'axios';

// Connect natively to the Node.js backend using ENV variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create configurable Axios Instance
const adminAxios = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

// Interceptor to inject JWT from Admin Session
adminAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('cb_admin_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const AdminAPI = {
    auth: {
        login: async (email, password) => {
            const res = await adminAxios.post('/auth/login', { email, password });
            if(res.data.token) localStorage.setItem('cb_admin_token', res.data.token);
            return res.data;
        },
        logout: () => localStorage.removeItem('cb_admin_token')
    },
    users: {
        getAll: async () => {
            // Mocking the get users endpoint for the admin view
            // In a real environment: await adminAxios.get('/admin/users');
            return [
                { id: '1', name: 'Rohan Fitness', email: 'rohan@example.com', role: 'creator', status: 'verified', joined: '2026-01-15' },
                { id: '2', name: 'MuscleMax', email: 'muscle@max.com', role: 'brand', status: 'active', joined: '2026-02-10' },
                { id: '3', name: 'TechScammer', email: 'spam@bot.com', role: 'creator', status: 'banned', joined: '2026-04-10' }
            ];
        }
    },
    campaigns: {
        getAll: async () => {
            return [
                { id: 'c1', title: 'Summer Shred Reel', brand: 'MuscleMax', budget: 15000, status: 'approved' },
                { id: 'c2', title: 'Fake Giveaways', brand: 'Unknown', budget: 500000, status: 'pending_review' }
            ];
        }
    },
    dashboard: {
        getMetrics: async () => {
            return {
                totalUsers: 1450,
                activeCampaigns: 89,
                totalRevenue: 2450000,
                spamDetected: 12
            };
        }
    }
};
