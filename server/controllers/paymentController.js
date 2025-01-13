import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe('sk_test_51QAqh3RwV6S8MUf6gwVbX8m6ETiZ11RsNnTLHotqvDiAt9jBPRGxHUE0KpL2IRG6jZZrGciA2Hsux730EkdH6PF100ajdfOK3Y');

class PaymentController {
  static async createStripeSession(req, res) {
    try {
      const { type, departure, arrival, price, distance } = req.body;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: `Transport ${type === 'road' ? 'routier' : 'sur machine'}`,
                description: `De ${departure} à ${arrival} (${distance}km)`,
              },
              unit_amount: Math.round(price * 100), // Stripe utilise les centimes
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/cancel`,
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error('Stripe session error:', error);
      res.status(500).json({ error: 'Error creating payment session' });
    }
  }

  static async getSession(req, res) {
    try {
      const { sessionId } = req.params;
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      res.json(session);
    } catch (error) {
      console.error('Error retrieving session:', error);
      res.status(500).json({ error: 'Error retrieving session' });
    }
  }
}

export default PaymentController;