import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });

      if (response.data.token) {
        await login(response.data.token);
        
        // Récupérer le devis en attente s'il existe
        const pendingQuote = localStorage.getItem('pendingQuote');
        
        if (pendingQuote && location.state?.from === '/quote') {
          const quoteData = JSON.parse(pendingQuote);
          
          // Créer la session de paiement
          const paymentResponse = await axios.post('http://localhost:3001/api/payment/create-checkout-session', {
            amount: Math.round(quoteData.price * 100),
            transportData: {
              departure: `${quoteData.departure}\n${quoteData.departureDetails}`,
              arrival: `${quoteData.arrival}\n${quoteData.arrivalDetails}`,
              distance: quoteData.distance,
              price: quoteData.price,
              transportType: quoteData.transportType
            }
          });

          // Nettoyer le localStorage
          localStorage.removeItem('pendingQuote');

          // Rediriger vers Stripe
          if (paymentResponse.data?.url) {
            window.location.replace(paymentResponse.data.url);
            return;
          }
        }

        // Si pas de devis en attente, rediriger vers la page précédente ou le dashboard
        navigate(location.state?.from || '/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-accent py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Connexion
            </h2>

            {location.state?.message && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-600">{location.state.message}</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Pas encore de compte ?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/register', { 
                      state: location.state 
                    })}
                    className="text-primary hover:underline"
                  >
                    S'inscrire
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}