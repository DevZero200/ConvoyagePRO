import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';

export function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-accent py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Paiement annulé
          </h1>
          <p className="text-gray-600 mb-6">
            Votre paiement a été annulé. Aucun montant n'a été débité.
          </p>
          <Button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </Button>
        </div>
      </div>
    </div>
  );
}