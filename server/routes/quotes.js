import express from 'express';
import QuoteController from '../controllers/quoteController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Calculer un devis
router.post('/calculate', QuoteController.calculate);

// Créer un devis (protégé)
router.post('/', auth, QuoteController.create);

// Récupérer les devis de l'utilisateur (protégé)
router.get('/', auth, QuoteController.getUserQuotes);

export default router;