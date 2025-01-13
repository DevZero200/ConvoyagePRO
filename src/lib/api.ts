import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const paymentService = {
  createStripeSession: (transportData: any) =>
    api.post('/payment/stripe/create-session', transportData),
  
  getStripeSession: (sessionId: string) =>
    api.get(`/payment/stripe/session/${sessionId}`),
};

export default api;