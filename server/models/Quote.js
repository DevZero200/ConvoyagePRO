// Modèle Quote - Gère les opérations liées aux devis
import { db } from '../config/database.js';

class Quote {
  // Créer un nouveau devis
  static create(quoteData) {
    const { user_id, type, departure, arrival, distance, price } = quoteData;

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO quotes (user_id, type, departure, arrival, distance, price)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, type, departure, arrival, distance, price],
        function(err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  }

  // Récupérer les devis d'un utilisateur
  static findByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM quotes WHERE user_id = ? ORDER BY created_at DESC',
        [userId],
        (err, quotes) => {
          if (err) reject(err);
          resolve(quotes);
        }
      );
    });
  }

  // Calculer le prix d'un devis
  static calculatePrice(type, distance) {
    const pricePerKm = type === 'road' ? 1 : 11;
    return distance * pricePerKm;
  }
}

export default Quote;