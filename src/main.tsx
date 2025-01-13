import React from 'react';
import { createRoot } from 'react-dom/client';
import { loadStripe } from '@stripe/stripe-js';
import App from './App';
import './index.css';

// Initialiser Stripe avec la clé publique
const stripePromise = loadStripe('pk_test_51QAqh3RwV6S8MUf6gwVbX8m6ETiZ11RsNnTLHotqvDiAt9jBPRGxHUE0KpL2IRG6jZZrGciA2Hsux730EkdH6PF100ajdfOK3Y');

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);