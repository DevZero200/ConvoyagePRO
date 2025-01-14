import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { CheckCircle } from 'lucide-react';

export function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirection automatique après 5 secondes
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-accent py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Paiement réussi !
              </h1>
              <p className="text-gray-600 mb-8">
                Votre paiement a été traité avec succès. Vous allez être redirigé vers votre tableau de bord dans quelques secondes.
              </p>
              <Button
                onClick={() => navigate('/dashboard')}
                className="w-full"
              >
                Aller au tableau de bord
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}