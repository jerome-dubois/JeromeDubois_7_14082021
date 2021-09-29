// Appel du framework Express
const express = require('express');

// Création du routeur Express pour y enregistrer les différentes routes définies ci-après
const router = express.Router();

// Import du middleware d'authentification
const auth = require('../middleware/auth');

// Import du controller user.js
const userCtrl = require('../controllers/user');

// Import du middleware validatePassword.js
const validatePassword = require('../middleware/validatePassword');

// Valide le mot de passe puis le chiffre et enfin seulement ajoute l'utilisateur à la base de données
// router.post('/auth/register', validatePassword, userCtrl.register);
router.post('/auth/register', userCtrl.register);

// Vérifie les informations d'identification de l'utilisateur, en renvoyant l'identifiant userID depuis la base de données et un jeton Web JSON signé (contenant également l'identifiant userID)
router.post('/auth/login', userCtrl.login);

// Renvoie le tableau de tous les users dans la base de données 
router.get('/users', auth, userCtrl.getAllUsers);

// Renvoie le user avec l'ID fourni
router.get('/users/:id', auth, userCtrl.getOneUser);

// Renvoie le user connecté
router.get('/loggedUser', auth, userCtrl.getLoggedUser);

// Renvoie le tableau de tous les users dans la base de données 
router.get('/users/:id/posts', auth, userCtrl.getUserAllPosts);

// Supprime le user avec l'ID fourni.
// router.delete('/:id', auth, userCtrl.deleteUser);

// Enregistrement des différentes routes dans le routeur Express
module.exports = router;