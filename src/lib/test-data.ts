// Données de test pour l'application
export const TEST_USER = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  phone: '+33123456789',
  country: 'FR',
  account_type: 'particulier'
};

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

export const TEST_QUOTES = [
  {
    id: 1,
    user_id: 1,
    type: 'road',
    departure: 'Paris',
    arrival: 'Lyon',
    price: 450,
    status: 'accepté',
    created_at: '2024-03-15'
  },
  {
    id: 2,
    user_id: 1,
    type: 'carrier',
    departure: 'Marseille',
    arrival: 'Bordeaux',
    price: 850,
    status: 'en-attente',
    created_at: '2024-03-14'
  },
  {
    id: 3,
    user_id: 1,
    type: 'road',
    departure: 'Lille',
    arrival: 'Nantes',
    price: 600,
    status: 'refusé',
    created_at: '2024-03-13'
  }
];