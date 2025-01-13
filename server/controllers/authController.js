// Contrôleur d'authentification
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Données de test
export const TEST_USER = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  phone: '+33123456789',
  country: 'FR',
  account_type: 'particulier'
};

// Données de test pour les transports
export const TEST_TRANSPORTS = [
  {
    id: 1,
    user_id: 1,
    type: 'road',
    departure: 'Paris',
    arrival: 'Lyon',
    distance: 465,
    price: 465,
    status: 'en-cours',
    current_location: 'Dijon',
    estimated_delivery: '2024-03-20',
    created_at: '2024-03-15'
  },
  {
    id: 2,
    user_id: 1,
    type: 'carrier',
    departure: 'Marseille',
    arrival: 'Bordeaux',
    distance: 645,
    price: 7095,
    status: 'livré',
    current_location: 'Bordeaux',
    estimated_delivery: '2024-03-10',
    created_at: '2024-03-08'
  },
  {
    id: 3,
    user_id: 1,
    type: 'road',
    departure: 'Lille',
    arrival: 'Nantes',
    distance: 582,
    price: 582,
    status: 'en-cours',
    current_location: 'Le Mans',
    estimated_delivery: '2024-03-22',
    created_at: '2024-03-16'
  }
];

class AuthController {
  // Connexion
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Vérifier les identifiants avec les données de test
      if (email === TEST_USER.email && password === TEST_USER.password) {
        const token = jwt.sign(
          { id: TEST_USER.id },
          'secret-key-for-test',
          { expiresIn: '24h' }
        );

        const { password: _, ...userWithoutPassword } = TEST_USER;
        res.json({ token, user: userWithoutPassword });
      } else {
        res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
}

export default AuthController;