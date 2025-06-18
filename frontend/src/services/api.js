import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth services
export const authService = {
    login: async (email, password) => {
        const response = await api.post('/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    register: async (name, email, password) => {
        const response = await api.post('/register', { name, email, password });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getCurrentUser: async () => {
        const response = await api.get('/user');
        return response.data;
    },
};

// Product services
export const productService = {
    getAll: async () => {
        const response = await api.get('/products');
        return response.data;
    },

    search: async (searchParams = {}) => {
        const params = new URLSearchParams();
        
        if (searchParams.search) params.append('search', searchParams.search);
        if (searchParams.category_id) params.append('category_id', searchParams.category_id);
        if (searchParams.min_price) params.append('min_price', searchParams.min_price);
        if (searchParams.max_price) params.append('max_price', searchParams.max_price);
        if (searchParams.in_stock) params.append('in_stock', searchParams.in_stock);
        
        const response = await api.get(`/products?${params.toString()}`);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    create: async (productData) => {
        const response = await api.post('/products', productData);
        return response.data;
    },

    update: async (id, productData) => {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },
};

// Category services
export const categoryService = {
    getAll: async () => {
        const response = await api.get('/categories');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    },

    create: async (categoryData) => {
        const response = await api.post('/categories', categoryData);
        return response.data;
    },

    update: async (id, categoryData) => {
        const response = await api.put(`/categories/${id}`, categoryData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    },
};

export default api; 