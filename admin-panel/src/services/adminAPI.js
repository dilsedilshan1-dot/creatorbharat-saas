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
            const res = await adminAxios.get('/admin/users');
            return res.data;
        }
    },
    campaigns: {
        getAll: async () => {
            const res = await adminAxios.get('/campaigns');
            return res.data;
        }
    },
    dashboard: {
        getMetrics: async () => {
            const res = await adminAxios.get('/admin/metrics');
            return res.data;
        }
    }
};
