// Contrôleur des devis
import Quote from '../models/Quote.js';

class QuoteController {
  // Calculer un devis
  static async calculate(req, res) {
    try {
      const { type, departure, arrival } = req.body;

      if (!type || !departure || !arrival) {
        return res.status(400).json({ error: 'Données manquantes' });
      }

      // Simulation de distance (à remplacer par l'API Google Maps)
      const distance = 100;
      const price = Quote.calculatePrice(type, distance);

      res.json({ distance, price });
    } catch (error) {
      console.error('Erreur de calcul du devis:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  // Créer un devis
  static async create(req, res) {
    try {
      const quoteId = await Quote.create({
        user_id: req.user.id,
        ...req.body
      });
      res.status(201).json({ id: quoteId });
    } catch (error) {
      console.error('Erreur de création du devis:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  // Récupérer les devis d'un utilisateur
  static async getUserQuotes(req, res) {
    try {
      const quotes = await Quote.findByUserId(req.user.id);
      res.json(quotes);
    } catch (error) {
      console.error('Erreur de récupération des devis:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
}

export default QuoteController;