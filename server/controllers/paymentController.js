const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    console.log('Début de la création de session de paiement');
    console.log('Body reçu:', req.body);

    const { amount, transportData } = req.body;

    if (!amount) {
      return res.status(400).json({
        message: 'Le montant est requis'
      });
    }

    try {
      console.log('Création de la session Stripe avec les paramètres:', {
        amount,
        transportData
      });

      // Créer la session de paiement
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Transport de véhicule',
                description: `De ${transportData.departure} à ${transportData.arrival}`,
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/success`,
        cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/cancel`,
        metadata: {
          transportType: transportData.transportType,
          distance: transportData.distance.toString(),
          departure: transportData.departure,
          arrival: transportData.arrival
        }
      });

      console.log('Session Stripe créée:', {
        id: session.id,
        url: session.url
      });

      // Sauvegarder la commande dans la base de données
      const transport = {
        departure: transportData.departure,
        arrival: transportData.arrival,
        distance: transportData.distance,
        price: amount / 100,
        transportType: transportData.transportType,
        status: 'pending',
        stripeSessionId: session.id
      };

      // Insérer dans la base de données
      req.db.run(
        `INSERT INTO transports (
          vehicleType,
          pickupLocation,
          deliveryLocation,
          price,
          status,
          paymentId
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          transport.transportType,
          transport.departure,
          transport.arrival,
          transport.price,
          transport.status,
          session.id
        ],
        (err) => {
          if (err) {
            console.error('Erreur lors de l\'insertion dans la base de données:', err);
          }
        }
      );

      // Retourner l'URL de redirection
      res.json({ url: session.url });
    } catch (stripeError) {
      console.error('Erreur Stripe:', stripeError);
      res.status(500).json({
        message: 'Erreur lors de la création de la session de paiement',
        error: stripeError.message,
      });
    }
  } catch (error) {
    console.error('Erreur lors de la création de la session de paiement:', error);
    res.status(500).json({
      message: 'Erreur lors de la création de la session de paiement',
      error: error.message,
    });
  }
};

const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Erreur de webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gérer l'événement de paiement réussi
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Paiement réussi:', session);
  }

  res.json({ received: true });
};

const getPaymentStatus = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.json({
      status: session.payment_status,
      amount: session.amount_total / 100,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du statut de paiement:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération du statut de paiement',
      error: error.message,
    });
  }
};

module.exports = {
  createCheckoutSession,
  handleWebhook,
  getPaymentStatus,
};