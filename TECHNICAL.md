# Documentation technique

## Architecture

### Frontend

1. **Composants React**
   - Composants fonctionnels avec TypeScript
   - Hooks personnalisés pour la logique
   - Context API pour la gestion d'état globale

2. **Routing**
   - React Router v6
   - Routes protégées avec authentification
   - Lazy loading des composants

3. **État et données**
   - Context API pour l'authentification
   - Appels API avec Axios
   - Types TypeScript pour la validation des données

4. **UI/UX**
   - Tailwind CSS pour le styling
   - Composants UI réutilisables
   - Design responsive
   - Icônes Lucide React

### Backend

1. **Serveur Express**
   - Architecture REST
   - Middleware pour l'authentification
   - Gestion des erreurs centralisée
   - CORS configuré

2. **Base de données**
   - SQLite avec le module `sqlite3`
   - Migrations pour la structure
   - Requêtes paramétrées pour la sécurité

3. **Authentification**
   - JWT pour les tokens
   - Bcrypt pour le hachage des mots de passe
   - Middleware de vérification des tokens

4. **API Routes**
   ```
   POST   /api/auth/login
   POST   /api/auth/register
   GET    /api/transports
   POST   /api/transports
   GET    /api/quotes
   POST   /api/quotes
   GET    /api/tracking/:code
   ```

## Sécurité

1. **Authentification**
   - Tokens JWT avec expiration
   - Mots de passe hachés avec bcrypt
   - Protection CSRF
   - Validation des données entrantes

2. **API**
   - Rate limiting
   - Validation des paramètres
   - Headers de sécurité
   - CORS configuré

3. **Base de données**
   - Requêtes paramétrées
   - Validation des entrées
   - Transactions pour l'intégrité

## Performance

1. **Frontend**
   - Code splitting
   - Lazy loading des routes
   - Optimisation des images
   - Minification du code

2. **Backend**
   - Caching des requêtes
   - Compression gzip
   - Pool de connexions
   - Optimisation des requêtes

## Composants principaux

1. **AuthContext**
   ```typescript
   interface AuthContextType {
     user: User | null;
     login: (email: string, password: string) => Promise<void>;
     register: (data: RegisterData) => Promise<void>;
     logout: () => void;
     isAuthenticated: boolean;
   }
   ```

2. **ProtectedRoute**
   ```typescript
   interface ProtectedRouteProps {
     children: React.ReactNode;
   }
   ```

3. **Dashboard**
   - Gestion des transports
   - Statistiques
   - Suivi en temps réel
   - Gestion des devis

## Base de données

1. **Tables**
   ```sql
   -- Users
   CREATE TABLE users (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     email TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL,
     phone TEXT NOT NULL,
     country TEXT NOT NULL,
     account_type TEXT NOT NULL,
     company_name TEXT,
     siret TEXT,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );

   -- Transports
   CREATE TABLE transports (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     user_id INTEGER NOT NULL,
     type TEXT NOT NULL,
     departure TEXT NOT NULL,
     arrival TEXT NOT NULL,
     status TEXT NOT NULL,
     price DECIMAL(10,2) NOT NULL,
     date DATETIME NOT NULL,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users (id)
   );

   -- Quotes
   CREATE TABLE quotes (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     user_id INTEGER NOT NULL,
     type TEXT NOT NULL,
     departure TEXT NOT NULL,
     arrival TEXT NOT NULL,
     price DECIMAL(10,2) NOT NULL,
     status TEXT NOT NULL,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users (id)
   );
   ```

## API Endpoints

1. **Authentication**
   ```
   POST /api/auth/login
   Body: { email: string, password: string }
   Response: { token: string, user: User }

   POST /api/auth/register
   Body: RegisterData
   Response: { token: string, user: User }
   ```

2. **Transports**
   ```
   GET /api/transports
   Headers: Authorization: Bearer <token>
   Query: { page: number, limit: number }
   Response: { transports: Transport[], total: number }

   POST /api/transports
   Headers: Authorization: Bearer <token>
   Body: { type: string, departure: string, arrival: string, date: string }
   Response: { id: number }
   ```

3. **Quotes**
   ```
   GET /api/quotes
   Headers: Authorization: Bearer <token>
   Response: Quote[]

   POST /api/quotes/calculate
   Body: { type: string, departure: string, arrival: string }
   Response: { price: number }
   ```

## Tests

1. **Configuration**
   ```javascript
   // vite.config.ts
   export default defineConfig({
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: './src/test/setup.ts',
     }
   });
   ```

2. **Exemples de tests**
   ```typescript
   // Auth tests
   describe('Authentication', () => {
     it('should login successfully', async () => {
       // Test implementation
     });
   });

   // Component tests
   describe('Dashboard', () => {
     it('should render user stats', () => {
       // Test implementation
     });
   });
   ```

## Déploiement

1. **Production Build**
   ```bash
   # Frontend
   npm run build
   # Backend
   npm run build:server
   ```

2. **Configuration serveur**
   ```nginx
   # nginx.conf
   server {
     listen 80;
     server_name your-domain.com;
     
     location / {
       root /path/to/dist;
       try_files $uri $uri/ /index.html;
     }
     
     location /api {
       proxy_pass http://localhost:3000;
     }
   }
   ```

3. **Process Manager**
   ```bash
   pm2 start server/index.js --name transport-platform
   ```