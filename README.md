# Plateforme de Transport de Véhicules

Une application web moderne pour la gestion de transport de véhicules, construite avec React, Node.js, et SQLite.

## Technologies utilisées

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express
- Base de données: SQLite
- Authentification: JWT
- Paiement: Stripe, PayPal
- Cartographie: Google Maps API

## Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- Un compte Stripe pour les paiements
- Un compte Google Cloud pour l'API Maps
- Un éditeur de code (VS Code recommandé)

## Installation

1. Cloner le repository

```bash
git clone https://github.com/votre-username/transport-platform.git
cd transport-platform
```

2. Installer les dépendances

```bash
# Installation des dépendances du frontend
npm install

# Installation des dépendances du backend
cd server
npm install
```

3. Configuration des variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
PORT=3000
JWT_SECRET=votre-secret-jwt
VITE_STRIPE_PUBLISHABLE_KEY=votre-cle-stripe-publique
STRIPE_SECRET_KEY=votre-cle-stripe-secrete
VITE_PAYPAL_CLIENT_ID=votre-client-id-paypal
VITE_GOOGLE_MAPS_API_KEY=votre-cle-api-google-maps
CLIENT_URL=http://localhost:5173
```

4. Initialiser la base de données

```bash
cd server
node database/init.js
```

## Démarrage du projet

1. Démarrer le serveur de développement frontend

```bash
# Dans le dossier racine
npm run dev
```

2. Démarrer le serveur backend

```bash
# Dans un nouveau terminal, dans le dossier server
npm run server
```

L'application sera accessible à l'adresse : http://localhost:5173

## Structure du projet

```
├── src/                  # Code source frontend
│   ├── components/       # Composants React réutilisables
│   ├── context/         # Contextes React (auth, etc.)
│   ├── lib/             # Utilitaires et helpers
│   └── pages/           # Pages de l'application
├── server/              # Code source backend
│   ├── database/        # Configuration et migrations SQLite
│   ├── middleware/      # Middleware Express
│   └── routes/          # Routes API
└── public/              # Assets statiques
```

## Déploiement

### Frontend

1. Construire l'application

```bash
npm run build
```

2. Les fichiers de production seront générés dans le dossier `dist`

3. Déployer sur votre hébergeur préféré (Netlify, Vercel, etc.)

### Backend

1. Configurer les variables d'environnement de production

2. Déployer sur votre serveur :
   - Installer Node.js
   - Cloner le repository
   - Installer les dépendances
   - Configurer un reverse proxy (nginx recommandé)
   - Utiliser PM2 pour la gestion des processus

```bash
npm install -g pm2
pm2 start server/index.js
```

## Tests

```bash
# Exécuter les tests unitaires
npm run test

# Exécuter les tests avec couverture
npm run test:coverage
```

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.