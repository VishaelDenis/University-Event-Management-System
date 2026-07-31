import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/venues';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token interceptor (if using JWT authentication)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const venueApi = {
    // Get all venues
    getAllVenues: async () => {
        const response = await api.get('/');
        return response.data;
    },

    // Get venue by ID
    getVenueById: async (id) => {
        const response = await api.get(`/${id}`);
        return response.data;
    },

    // Create new venue
    createVenue: async (venueData) => {
        const response = await api.post('/', venueData);
        return response.data;
    },

    // Update venue
    updateVenue: async (id, venueData) => {
        const response = await api.put(`/${id}`, venueData);
        return response.data;
    },

    // Update capacity only
    updateCapacity: async (id, capacity) => {
        const response = await api.put(`/${id}/capacity`, capacity);
        return response.data;
    },

    // Toggle availability
    toggleAvailability: async (id) => {
        const response = await api.put(`/${id}/toggle`);
        return response.data;
    },

    // Delete venue
    deleteVenue: async (id) => {
        const response = await api.delete(`/${id}`);
        return response.data;
    },

    // Search venues
    searchVenues: async (keyword) => {
        const response = await api.get(`/search?keyword=${keyword}`);
        return response.data;
    },

    // Filter venues
    filterVenues: async (filters) => {
        const params = new URLSearchParams();
        Object.keys(filters).forEach(key => {
            if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
                params.append(key, filters[key]);
            }
        });
        const response = await api.get(`/filter?${params.toString()}`);
        return response.data;
    },

    // Get available venues
    getAvailableVenues: async () => {
        const response = await api.get('/available');
        return response.data;
    },

    // Get venues for event
    getVenuesForEvent: async (capacity) => {
        const response = await api.get(`/for-event?capacity=${capacity}`);
        return response.data;
    }
};