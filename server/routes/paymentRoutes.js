const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const PaymentController = require('../controllers/paymentController');

// Route pour créer une session de paiement Stripe
router.post('/create-checkout-session', isAuthenticated, PaymentController.createCheckoutSession);

// Route pour le webhook Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), PaymentController.handleWebhook);

// Route pour vérifier le statut d'un paiement
router.get('/status/:sessionId', isAuthenticated, PaymentController.getPaymentStatus);

module.exports = router;
