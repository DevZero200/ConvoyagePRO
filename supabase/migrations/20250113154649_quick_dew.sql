/*
  # Ajout de la table des paiements

  1. Nouvelle Table
    - `payments`
      - `id` (INTEGER, clé primaire)
      - `transport_id` (INTEGER, clé étrangère)
      - `amount` (DECIMAL)
      - `payment_method` (TEXT)
      - `payment_id` (TEXT)
      - `status` (TEXT)
      - `created_at` (DATETIME)

  2. Relations
    - Lien avec la table `transports`
*/

CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transport_id INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('stripe', 'paypal')),
  payment_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (transport_id) REFERENCES transports (id)
);

CREATE INDEX idx_payments_transport_id ON payments(transport_id);
CREATE INDEX idx_payments_payment_id ON payments(payment_id);