// Import du schéma de données Post défini comme modèle via Sequelize

const db = require('../models');
const { Post } = db.sequelize.models;

// Import de 'file system' de Node pour la gestion des fichiers (dont le téléchargement)
const fs = require('fs');

// Import du package pour pouvoir créer et vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

// Définition et export des différentes logiques métier correspondant à chacune des routes

// Définition et export de la logique métier appliquée à la route post qui crée le post avec l'ID fourni

exports.createPost = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    // console.log(token);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    // console.log("userId",userId);
    // console.log("req.body.userId",req.body.userId);
    console.log("req.body",req.body);
    // console.log("req.body.Post",req.body.Post);
    // console.log("req.body.Post.content",req.body.Post.content);
    const postObject = req.body.Post;
    // const post = new Post({
    //     userId: userId,
    //     content: req.body.content,
    //     imageUrl: req.body.imageUrl
    // });    
    const post = new Post({
        ...postObject,
        userId: userId,         
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post registered !'}))
        .catch(error => res.status(400).json({ error }));
};

/* Définition et export de la logique métier appliquée à la route put qui met à jour le post avec l'identifiant fourni. 
- Si une image est téléchargée, elle est capturée et l'image URL des posts mise à jour.
- Si aucun fichier n'est fourni, les détails de le post figurent directement dans le corps de la demande (req.body.name, req.body.heat etc).
- Si un fichier est fourni, le post avec chaîne est en req.body.post.*/
exports.modifyPost = (req, res, next) => {
    
    // const token = req.headers.authorization.split(' ')[1];
    // console.log(token);
    // const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // const userId = decodedToken.userId;
    // console.log("userId",userId);
    // console.log("req.body.userId",req.body.userId);
    console.log("req.body",req.body);
    console.log("req.params.id",req.params.id);
    // console.log("req.body.Post",req.body.Post);
    // console.log("req.body.Post.content",req.body.Post.content);
    // Si la modification de l'objet post implique un changement d'image
    // if (req.file) {
        // Alors on recherche l'objet à modifier
        // Post.findOne({ id: req.params.id })
        // Post.findOne({ id: req.body.id })
        // Puis on supprime l'ancienne image correspondante
        // .then((post) => {
        //     const filename = post.imageUrl.split('/images/')[1];
        //     fs.unlinkSync(`images/${filename}`);  
        // })
    // }

    /* Puis, on définit postObject comme une concaténation des valeurs du post modifié avec une nouvelle valeur d'url pour la nouvelle image si elle existe sinon on y affecte les nouvelles valeurs de post mais avec la même valeur d'url en cas d'image non modifiée*/
    const postObject = req.body;

    // Alors on recherche l'objet à modifier
    Post.findOne({
        where: { id: req.params.id }          
    })
    .then((post) => {
        post.update(postObject) 
    })
    .then(() => res.status(200).json({message : 'Post modified !'}))
    .catch(error => res.status(400).json({ error }));
    
          
    /* Puis, on définit postObject comme une concaténation des valeurs du post modifié avec une nouvelle valeur d'url pour la nouvelle image si elle existe sinon on y affecte les nouvelles valeurs de post mais avec la même valeur d'url en cas d'image non modifiée*/
    // const postObject = {...req.body};

    // Enfin, bien-sûr, on applique les modifications, dans les 2 cas, dans la base de données via le modèle de données Post et la méthode updateOne
    // Post.update({ id: req.params.id}, { ...req.body, id: req.params.id })        
    //     .then(() => res.status(200).json({message : 'Post modified !'}))
    //     .catch(error => res.status(400).json({ error }));  
        
};

// Définition et export de la logique métier appliquée à la route get qui renvoie le post avec l'ID fourni
exports.getOnePost = (req, res, next) => {      
    Post.findOne({
        where: { id: req.params.id },
        // include: [
        //     {
        //         model: db.User
        //     }          
        // ]
        })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
        
};

// Définition et export de la logique métier appliquée à la route delete qui supprime le post avec l'ID fourni
exports.deletePost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id },
        })
        .then(post => {
            // const filename = post.imageUrl.split('/images/')[1];
            // fs.unlink(`images/${filename}`, () => {
            //     Post.deleteOne({ id: req.params.id })
            //         .then(() => res.status(200).json({message : 'Post deleted !'}))
            //         .catch(error => res.status(400).json({ error }));
            // });
            post.destroy({ id: req.params.id })
                    .then(() => res.status(200).json({message : 'Post deleted !'}))
                    .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));       
};


// Définition et export de la logique métier appliquée à la route get qui renvoie le tableau de toutes les posts dans la base de données 
exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};
