# Guide de contribution

## Configuration de l'environnement de développement

1. **Prérequis**
   - Node.js v18+
   - npm ou yarn
   - VS Code (recommandé)

2. **Extensions VS Code recommandées**
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - ES7+ React/Redux/React-Native snippets

3. **Installation**
   ```bash
   git clone <repository>
   cd <project-folder>
   npm install
   ```

4. **Variables d'environnement**
   Créer un fichier `.env` à la racine :
   ```env
   PORT=3000
   JWT_SECRET=your-secret-key
   VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key
   CLIENT_URL=http://localhost:5173
   ```

## Standards de code

1. **TypeScript**
   - Utiliser des types explicites
   - Éviter `any`
   - Utiliser les interfaces pour les props des composants

2. **React**
   - Utiliser des composants fonctionnels
   - Hooks personnalisés pour la logique réutilisable
   - Props typées avec TypeScript

3. **Tailwind CSS**
   - Suivre la convention de nommage des classes
   - Utiliser les classes utilitaires
   - Éviter le CSS personnalisé sauf si nécessaire

4. **Commits**
   Format : `type(scope): description`
   Types : feat, fix, docs, style, refactor, test, chore

## Architecture du projet

1. **Frontend (`/src`)**
   ```
   src/
   ├── components/        # Composants réutilisables
   │   ├── layout/       # Composants de mise en page
   │   └── ui/          # Composants d'interface
   ├── context/         # Contextes React
   ├── lib/            # Utilitaires
   └── pages/          # Pages de l'application
   ```

2. **Backend (`/server`)**
   ```
   server/
   ├── database/       # Configuration SQLite
   ├── middleware/     # Middleware Express
   └── routes/        # Routes API
   ```

## Tests

1. **Tests unitaires**
   ```bash
   npm run test
   ```

2. **Tests d'intégration**
   ```bash
   npm run test:integration
   ```

## Déploiement

1. **Build**
   ```bash
   npm run build
   ```

2. **Production**
   ```bash
   npm run start
   ```

## Workflow Git

1. Créer une branche : `feature/nom-feature` ou `fix/nom-fix`
2. Développer et tester
3. Créer une Pull Request
4. Code review
5. Merge après approbation