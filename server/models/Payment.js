// Modèle Payment - Gère les opérations liées aux paiements
import { db } from '../config/database.js';

class Payment {
  // Créer un nouveau paiement
  static create(paymentData) {
    const { transport_id, amount, payment_method, payment_id, status } = paymentData;

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO payments (transport_id, amount, payment_method, payment_id, status)
         VALUES (?, ?, ?, ?, ?)`,
        [transport_id, amount, payment_method, payment_id, status],
        function(err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  }

  // Mettre à jour le statut d'un paiement
  static updateStatus(paymentId, status) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE payments SET status = ? WHERE payment_id = ?',
        [status, paymentId],
        (err) => {
          if (err) reject(err);
          resolve(true);
        }
      );
    });
  }
}

export default Payment;