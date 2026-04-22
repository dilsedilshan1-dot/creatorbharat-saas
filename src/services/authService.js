// src/services/authService.js

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const SESSION_KEY = 'cb_session_token';

export const AuthService = {
    login: async (email, password) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            
            if (!response.ok) throw new Error(data.message || 'Login failed');
            
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
            return data;
        } catch (error) {
            throw error;
        }
    },
    logout: () => {
        sessionStorage.removeItem(SESSION_KEY);
    },
    getCurrentUser: () => {
        const stored = sessionStorage.getItem(SESSION_KEY);
        return stored ? JSON.parse(stored) : null;
    },
    isAuthenticated: () => !!sessionStorage.getItem(SESSION_KEY)
};
