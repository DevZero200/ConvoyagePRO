import express from 'express';
import { TEST_TRANSPORTS } from '../controllers/authController.js';

const router = express.Router();

// Obtenir le statut d'un transport
router.get('/:code', (req, res) => {
  try {
    const transportId = parseInt(req.params.code);
    const transport = TEST_TRANSPORTS.find(t => t.id === transportId);

    if (!transport) {
      return res.status(404).json({ error: 'Transport non trouvé' });
    }

    // Formater la réponse pour correspondre à l'interface TrackingStatus
    res.json({
      status: transport.status,
      location: transport.current_location,
      lastUpdate: transport.created_at,
      departure: transport.departure,
      arrival: transport.arrival,
      date: transport.estimated_delivery
    });
  } catch (error) {
    console.error('Erreur de récupération du suivi:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;