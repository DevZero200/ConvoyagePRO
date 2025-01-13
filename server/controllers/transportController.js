// Contrôleur des transports
import { TEST_TRANSPORTS } from './authController.js';

class TransportController {
  // Récupérer les transports d'un utilisateur
  static async getUserTransports(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const userId = req.user.id;

      // Filtrer les transports pour l'utilisateur connecté
      const userTransports = TEST_TRANSPORTS.filter(t => t.user_id === userId);
      
      // Calculer les statistiques
      const transportsEnCours = userTransports.filter(t => t.status === 'en-cours').length;
      const revenuTotal = userTransports.reduce((sum, t) => sum + t.price, 0);

      // Pagination
      const start = (page - 1) * limit;
      const paginatedTransports = userTransports.slice(start, start + limit);

      res.json({
        transports: paginatedTransports,
        total: userTransports.length,
        stats: {
          transportsEnCours,
          totalTransports: userTransports.length,
          revenuTotal
        },
        currentPage: page,
        totalPages: Math.ceil(userTransports.length / limit)
      });
    } catch (error) {
      console.error('Erreur de récupération des transports:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  // Obtenir le statut d'un transport
  static async getStatus(req, res) {
    try {
      const transportId = parseInt(req.params.code);
      const transport = TEST_TRANSPORTS.find(t => t.id === transportId);

      if (!transport) {
        return res.status(404).json({ error: 'Transport non trouvé' });
      }

      res.json(transport);
    } catch (error) {
      console.error('Erreur de récupération du statut:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
}

export default TransportController;