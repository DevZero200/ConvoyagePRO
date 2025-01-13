import express from 'express';
import TransportController from '../controllers/transportController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Créer un transport (protégé)
router.post('/', auth, TransportController.create);

// Récupérer les transports de l'utilisateur (protégé)
router.get('/', auth, TransportController.getUserTransports);

// Obtenir le statut d'un transport
router.get('/:code', TransportController.getStatus);

// Mettre à jour le statut d'un transport (protégé)
router.post('/:code/update', auth, TransportController.updateStatus);

export default router;