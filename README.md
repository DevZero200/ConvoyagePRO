# ConvoyagePRO - Plateforme de Transport de Véhicules

ConvoyagePRO est une application web moderne permettant de gérer le transport de véhicules de manière simple et efficace.

## Fonctionnalités

- Calcul automatique des prix basé sur la distance
- Système de paiement sécurisé avec Stripe
- Interface utilisateur moderne et responsive
- Tableau de bord pour suivre vos commandes
- Authentification des utilisateurs

## Technologies Utilisées

- Frontend: React, TypeScript, TailwindCSS
- Backend: Node.js, Express
- Base de données: SQLite
- Paiement: Stripe
- Cartographie: Google Maps API

## Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Compte Stripe (pour les paiements)
- Clé API Google Maps

## Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/votre-username/ConvoyagePRO.git
cd ConvoyagePRO
```

2. Installez les dépendances du frontend :

```bash
npm install
```

3. Installez les dépendances du backend :

```bash
cd server
npm install
```

4. Créez un fichier `.env` dans le dossier racine :

```env
VITE_GOOGLE_MAPS_API_KEY=votre_clé_google_maps
```

5. Créez un fichier `.env` dans le dossier `server` :

```env
PORT=3001
STRIPE_SECRET_KEY=votre_clé_secrète_stripe
JWT_SECRET=votre_secret_jwt
```

## Démarrage

1. Démarrez le serveur backend :

```bash
cd server
npm run dev
```

2. Dans un nouveau terminal, démarrez le frontend :

```bash
cd ..
npm run dev
```

3. Ouvrez votre navigateur et accédez à :
```
http://localhost:5173
```

## Utilisation

1. Créez un compte ou connectez-vous
2. Accédez à la page de devis
3. Entrez les adresses de départ et d'arrivée
4. Choisissez le type de transport
5. Validez votre commande avec paiement sécurisé

## Variables d'Environnement Requises

### Frontend (.env)
- `VITE_GOOGLE_MAPS_API_KEY` : Clé API Google Maps

### Backend (server/.env)
- `PORT` : Port du serveur (default: 3001)
- `STRIPE_SECRET_KEY` : Clé secrète Stripe
- `JWT_SECRET` : Secret pour la génération des tokens JWT

## Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Contact

Votre Nom - [@votre_twitter](https://twitter.com/votre_twitter)

Lien du projet: [https://github.com/votre-username/ConvoyagePRO](https://github.com/votre-username/ConvoyagePRO)