// Modèle User - Gère les opérations liées aux utilisateurs
import { db } from '../config/database.js';
import bcrypt from 'bcryptjs';

class User {
  // Trouver un utilisateur par email
  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err) reject(err);
        resolve(user);
      });
    });
  }

  // Créer un nouvel utilisateur
  static async create(userData) {
    const { name, email, password, phone, country, account_type, company_name, siret } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (name, email, password, phone, country, account_type, company_name, siret)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, email, hashedPassword, phone, country, account_type, company_name, siret],
        function(err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  }

  // Vérifier les identifiants
  static async verifyCredentials(email, password) {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return user;
  }
}

export default User;