import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from '../../components/ui/button';
import axios from 'axios';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#1B2B65',
      fontFamily: '"Inter", system-ui, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      lineHeight: '1.5',
      '::placeholder': {
        color: '#94a3b8'
      },
      padding: '12px'
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444'
    }
  },
  hidePostalCode: true
};

interface CheckoutFormProps {
  amount: number;
  orderId: string;
  onSuccess: () => void;
}

export function CheckoutForm({ amount, orderId, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Créer une intention de paiement
      const { data: paymentIntent } = await axios.post('http://localhost:3001/api/create-payment-intent', {
        amount,
        orderId
      });

      // 2. Confirmer le paiement avec Stripe
      const { error: stripeError, paymentIntent: confirmedPayment } = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message || 'Une erreur est survenue lors du paiement');
        return;
      }

      if (confirmedPayment.status === 'succeeded') {
        // 3. Mettre à jour le statut de la commande
        await axios.post('http://localhost:3001/api/update-order-status', {
          orderId,
          status: 'paid',
          paymentIntentId: confirmedPayment.id
        });

        onSuccess();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <CardElement options={CARD_ELEMENT_OPTIONS} className="p-2" />
      </div>

      {error && (
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="text-center text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <p className="font-medium text-blue-800 mb-1">Carte de test :</p>
        <p>4242 4242 4242 4242</p>
        <p>Date : 12/34 - CVC : 123</p>
      </div>

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full h-12 text-lg"
      >
        {loading ? 'Traitement...' : `Payer ${amount}€`}
      </Button>
    </form>
  );
}