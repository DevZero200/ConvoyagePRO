// Import des dépendances nécessaires
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Chemin de la base de données SQLite
const dbPath = join(__dirname, 'database.sqlite');
export const db = new sqlite3.Database(dbPath);

export function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Table des utilisateurs
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          phone TEXT NOT NULL,
          country TEXT NOT NULL,
          account_type TEXT NOT NULL CHECK (account_type IN ('particulier', 'professionnel')),
          company_name TEXT,
          siret TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Table des devis
      // Stocke les demandes de devis avec leur statut
      db.run(`
        CREATE TABLE IF NOT EXISTS quotes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          type TEXT NOT NULL CHECK (type IN ('road', 'carrier')),
          departure TEXT NOT NULL,
          arrival TEXT NOT NULL,
          distance DECIMAL(10,2) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id)
        )
      `);

      // Table des transports
      // Stocke les commandes de transport avec leur statut de suivi
      db.run(`
        CREATE TABLE IF NOT EXISTS transports (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          quote_id INTEGER,
          type TEXT NOT NULL CHECK (type IN ('road', 'carrier')),
          departure TEXT NOT NULL,
          arrival TEXT NOT NULL,
          distance DECIMAL(10,2) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_transit', 'delivered', 'cancelled')),
          current_location TEXT,
          estimated_delivery DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id),
          FOREIGN KEY (quote_id) REFERENCES quotes (id)
        )
      `);

      // Table de suivi des transports
      // Stocke l'historique des mises à jour de statut
      db.run(`
        CREATE TABLE IF NOT EXISTS tracking_updates (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          transport_id INTEGER NOT NULL,
          status TEXT NOT NULL,
          location TEXT NOT NULL,
          description TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (transport_id) REFERENCES transports (id)
        )
      `);
    });
    resolve();
  });
}