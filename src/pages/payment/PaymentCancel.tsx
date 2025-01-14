import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { XCircle } from 'lucide-react';

export function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-accent py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <XCircle className="w-16 h-16 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Paiement annulé
              </h1>
              <p className="text-gray-600 mb-8">
                Le paiement a été annulé. Vous pouvez réessayer ou revenir plus tard.
              </p>
              <div className="space-y-4">
                <Button
                  onClick={() => navigate('/quote')}
                  className="w-full"
                >
                  Retour au devis
                </Button>
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                  className="w-full"
                >
                  Aller au tableau de bord
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}