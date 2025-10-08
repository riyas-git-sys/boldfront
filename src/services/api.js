import axios from 'axios';

// Use your actual backend URL
const API_BASE_URL = 'https://boldback.vercel.app';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // Increased to 10 seconds
});

// Add request interceptor for debugging
api.interceptors.request.use(
    (config) => {
        console.log(`🔄 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
        return config;
    },
    (error) => {
        console.error('🚨 Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
api.interceptors.response.use(
    (response) => {
        console.log(`✅ Response received:`, response.status, response.data);
        return response;
    },
    (error) => {
        console.error('🚨 Response error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            message: error.message
        });
        return Promise.reject(error);
    }
);

export const shortenUrl = async (longUrl) => {
    try {
        const response = await api.post('/shorten', { longUrl });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to shorten URL');
    }
};

export const getAllUrls = async () => {
    try {
        const response = await api.get('/api/urls');
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching all URLs:', error);
        throw new Error('Failed to fetch URLs');
    }
};

// Test backend connection using the working endpoint
export const testBackendConnection = async () => {
    try {
        const response = await api.get('/api/test');
        return { connected: true, data: response.data };
    } catch (error) {
        console.error('Backend connection test failed:', error.message);
        throw new Error('Backend connection failed');
    }
};

export default api;