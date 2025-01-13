import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from './CheckoutForm';
import { useNavigate } from 'react-router-dom';

// Assurez-vous d'utiliser la clé publique de test Stripe
const stripePromise = loadStripe('pk_test_51QAqh3RwV6S8MUf6gwVbX8m6ETiZ11RsNnTLHotqvDiAt9jBPRGxHUE0KpL2IRG6jZZrGciA2Hsux730EkdH6PF100ajdfOK3Y');

// Configuration de l'apparence de Stripe
const STRIPE_OPTIONS = {
  appearance: {
    theme: 'stripe',
    variables: {
      colorPrimary: '#1B2B65',
      fontFamily: '"Inter", system-ui, sans-serif',
    },
  },
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
    },
  ],
};

interface PaymentPageProps {
  amount: number;
}

export function PaymentPage({ amount }: PaymentPageProps) {
  const navigate = useNavigate();

  const handlePaymentSuccess = () => {
    navigate('/payment/success');
  };

  return (
    <div className="min-h-screen bg-accent py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Paiement sécurisé
            </h1>

            <div className="mb-8">
              <div className="bg-accent rounded-lg p-4">
                <p className="text-center">
                  <span className="block text-sm text-gray-600">Montant à payer</span>
                  <span className="text-3xl font-bold text-primary">{amount}€</span>
                </p>
              </div>
            </div>

            <Elements stripe={stripePromise} options={STRIPE_OPTIONS}>
              <CheckoutForm amount={amount} onSuccess={handlePaymentSuccess} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
}