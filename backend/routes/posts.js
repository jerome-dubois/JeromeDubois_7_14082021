// Appel du framework Express
const express = require('express');

// Création du routeur Express pour y enregistrer les différentes routes définies ci-après
const router = express.Router();

// Import du middleware d'authentification
const auth = require('../middleware/auth');

// Import du middleware de téléchargement des fichiers
const multer = require('../middleware/multer-config');

// Import du controller posts.js avec déclaration de postsCtrl
const postsCtrl = require('../controllers/posts');

// Import du controller posts.js avec déclaration de commentsCtrl
const commentsCtrl = require('../controllers/comments');

// Implémentation des différentes routes des posts avec, pour chaque route, authentification et configuration de la logique métier appropriée:

// Renvoie le tableau de tous les posts dans la base de données 
router.get('/', auth, postsCtrl.getAllPosts);

// Renvoie le post avec l'ID fourni
router.get('/:id', auth, postsCtrl.getOnePost);

// Capture et enregistre l'image du post, analyse le post en utilisant une chaîne de caractères et l'enregistre dans la base de données, en définissant correctement son image URL.
router.post('/', auth, multer, postsCtrl.createPost);

// Met à jour le post avec l'identifiant fourni. Si une image est téléchargée, elle est capturée l'image URL des sauces mise à jour. Si aucun fichier n'est fourni, les détails de la sauce figurent directement dans le corps de la demande (req.body.name, req.body.heat etc). Si un fichier est fourni, la sauce avec chaîne est en req.body.sauce.
router.put('/:id', auth, multer, postsCtrl.modifyPost);
// router.put('/:id', auth, postsCtrl.modifyPost);

// Supprime le post avec l'ID fourni.
router.delete('/:id', auth, postsCtrl.deletePost);

router.post('/:postId/comments', auth, commentsCtrl.createComment);
router.get('/:postId/comments/:id', auth, commentsCtrl.getOneComment);
router.get('/:postId/comments/', auth, commentsCtrl.getAllComments);
router.put('/:postId/comments/:id', auth, commentsCtrl.modifyComment);
router.delete('/:postId/comments/:id', auth, commentsCtrl.deleteComment);

// Enregistrement des différentes routes dans le routeur Express
module.exports = router;