// src/services/api.js
// Production Data Layer utilizing Environment Variables

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fetchWithAuth = async (endpoint, options = {}) => {
  const token = sessionStorage.getItem('cb_session_token');
  const headers = { 
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${JSON.parse(token)?.token}` } : {})
  };

  const config = { ...options, headers };
  
  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

export const API = {
  users: {
    getCreators: async (filters = {}) => {
      const queryParams = new URLSearchParams(filters).toString();
      return fetchWithAuth(`/creators?${queryParams}`);
    },
    getById: async (id) => fetchWithAuth(`/creators/${id}`),
    create: async (payload) => {
      // First register the user via Auth controller
      const authRes = await fetchWithAuth('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name: payload.name, email: payload.email || `${payload.handle}@temp.com`, password: 'password123', role: 'creator' })
      });
      
      // We must mock the session to allow the profile creation (protected Route)
      sessionStorage.setItem('cb_session_token', JSON.stringify(authRes));

      // Then create the creator profile via Creator controller
      const profileRes = await fetchWithAuth('/creators', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      return { ...authRes, profile: profileRes };
    }
  },
  campaigns: {
    getAll: async () => fetchWithAuth('/campaigns'),
    create: async (payload) => fetchWithAuth('/campaigns', { method: 'POST', body: JSON.stringify(payload) })
  },
  messages: {
    send: async (payload) => fetchWithAuth('/messages', { method: 'POST', body: JSON.stringify(payload) }),
    getByReceiver: async () => fetchWithAuth('/messages') // Backend logic determines user via JWT automatically
  }
};
