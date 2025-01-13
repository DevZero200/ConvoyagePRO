// Modèle Transport - Gère les opérations liées aux transports
import { db } from '../config/database.js';

class Transport {
  // Créer un nouveau transport
  static create(transportData) {
    const { user_id, quote_id, type, departure, arrival, distance, price } = transportData;

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO transports (
          user_id, quote_id, type, departure, arrival, 
          distance, price, status, estimated_delivery
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'confirmed', datetime('now', '+3 days'))`,
        [user_id, quote_id, type, departure, arrival, distance, price],
        function(err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  }

  // Trouver un transport par ID avec ses mises à jour
  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT t.*, tu.location as current_location, tu.created_at as last_update
         FROM transports t
         LEFT JOIN tracking_updates tu ON tu.transport_id = t.id
         WHERE t.id = ?
         ORDER BY tu.created_at DESC
         LIMIT 1`,
        [id],
        (err, transport) => {
          if (err) reject(err);
          resolve(transport);
        }
      );
    });
  }

  // Mettre à jour le statut d'un transport
  static async updateStatus(id, status, location) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE transports SET status = ?, current_location = ? WHERE id = ?',
        [status, location, id],
        (err) => {
          if (err) reject(err);
          resolve(true);
        }
      );
    });
  }

  // Récupérer les transports d'un utilisateur avec pagination
  static async findByUserId(userId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    return new Promise((resolve, reject) => {
      db.get(
        'SELECT COUNT(*) as total FROM transports WHERE user_id = ?',
        [userId],
        (err, row) => {
          if (err) reject(err);

          db.all(
            `SELECT * FROM transports 
             WHERE user_id = ? 
             ORDER BY created_at DESC 
             LIMIT ? OFFSET ?`,
            [userId, limit, offset],
            (err, transports) => {
              if (err) reject(err);
              resolve({
                transports,
                total: row.total,
                currentPage: page,
                totalPages: Math.ceil(row.total / limit)
              });
            }
          );
        }
      );
    });
  }
}

export default Transport;