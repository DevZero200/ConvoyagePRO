import express from 'express';
import PaymentController from '../controllers/paymentController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/stripe/create-session', auth, PaymentController.createStripeSession);
router.get('/stripe/session/:sessionId', auth, PaymentController.getSession);

export default router;