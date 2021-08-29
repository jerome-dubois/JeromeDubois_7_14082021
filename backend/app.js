const express = require('express');

/* Afin de lire les données HTTP POST, nous devons utiliser le module "body-parser". body-parser est un middleware express qui lit l'entrée d'un formulaire et le stocke en tant qu'objet javascript accessible via req.body */
const bodyParser = require('body-parser');

/* Le module de chemin d'accès path fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires. Permet d'accéder au path de notre serveur*/
const path = require('path');

/* Helmet aide à protéger l'application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP liées à la sécurité grâce aux neuf middleware suivants: csp, hidePoweredBy, hsts, ieNoOpen, noCache, noSniff, frameguard, xssFilter  
- Ressource:https://www.npmjs.com/package/helmet
- Ressource: https://expressjs.com/fr/advanced/best-practice-security.html */
const helmet = require("helmet");

// Ce middleware Express définit des en-têtes de réponse HTTP pour essayer de désactiver la mise en cache côté client.
const nocache = require("nocache");

/* Déclaration du module Node.js permettant d'utiliser les cookies de manière sécurisée
Ressource: https://www.npmjs.com/package/express-session*/
const session = require('express-session');

// Import du routeur avec ses différentes routes définies dans posts et user
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

/* Implémentation du module qui charge les variables d'environnement du fichier .env dans process.env
Cela permet de masquer les paramétres de connexion à la base de données
(Le stockage de la configuration dans l'environnement séparé du code est basé sur la méthodologie 
de l'application The Twelve-Factor.)
Ressource: https://www.npmjs.com/package/dotenv */
require('dotenv').config();

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Création du middleware session avec les options de sécurisation des cookies

/* Option name: L’utilisation d’un nom de cookie de session par défaut risque d’ouvrir l'application aux attaques. Le problème de sécurité qui en découle est le suivant : une personne potentiellement malveillante peut l’utiliser pour s’identifier auprès du serveur et cibler ses attaques en conséquence. Pour éviter ce problème, on utilise un nom de cookie générique grâce à l'option name
  - Objet Cookie: 
  - httponly: Garantit que le cookie n’est envoyé que sur HTTP(S), pas au JavaScript du client, ce qui renforce la protection contre les attaques de type cross-site scripting.
maxAge: Définition d'une durée d'expiration d'une pour les sessions de cookies (calculée en ajoutant à la valeur de l'heure actuelle du serveur 3600000s) */

app.use(session({
  secret: 'jzKahd424!*',
  name : 'sessionId_OCP6',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 3600000 } 
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Activation du module helmet précédemment défini sur l'application
// Ce dernier via le middleware xssFilter permet notamment en définissant X-XSS-Protection d’activer le filtre de script intersites (XSS) dans les navigateurs Web les plus récents (protection contre les attaques Cross Site Scripting = XSS)
app.use(helmet());

// Désactivation de la mise en cache sur le navigateur pour limiter le risque d'attaque de sessions
app.use(nocache());

app.use('/images', express.static(path.join(__dirname, 'images')));

// Implémentation des routes dans l'application en définisant les chemins de base d'enregistrement du routeur qui s'appliquent pour les différentes routes définies dans posts et user
app.use('/api/posts', postsRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;