require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const paymentRoutes = require('./routes/payment');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = new sqlite3.Database('transport.db', (err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connecté à la base de données SQLite');
    
    // Créer la table des transports si elle n'existe pas
    db.run(`
      CREATE TABLE IF NOT EXISTS transports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehicleType TEXT,
        pickupLocation TEXT,
        deliveryLocation TEXT,
        price REAL,
        status TEXT,
        paymentId TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

// Attacher la base de données à chaque requête
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use('/api/payment', paymentRoutes);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});