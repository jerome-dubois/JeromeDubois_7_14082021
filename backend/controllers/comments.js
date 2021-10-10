// Import du schéma de données Comments défini comme modèle via Sequelize

const db = require('../models');
const { User, Comments } = db.sequelize.models;

// Import du package pour pouvoir créer et vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

// Définition et export des différentes logiques métier correspondant à chacune des routes

// Définition et export de la logique métier appliquée à la route post qui crée le commentaire avec l'ID fourni

exports.createComment = (req, res, next) => {

    const comment = new Comments({
        ...req.body,
        postId: req.params.postId,
        userId: req.body.userId
    });
    console.log("req.body",req.body);
    comment
        // .findOne({
        // where: { id: comment.id },
        // include: [{
        //     model: User
        // }]          
        // })
        .save()
        .then(() => res.status(201).json({ message: 'Comment registered !'}))
        .catch(error => res.status(400).json({ error }));

};

exports.modifyComment = (req, res, next) => {
    console.log("req.body", req.body);

    Comments.findOne({
        // where: { id: req.params.id, userId: req.user.id },
        where: { id: req.params.id },
        // include: [{
        //     model: User
        // }]          
    })
    .then((comment) => {
        comment.update(req.body)
    })
    .then(() => res.status(200).json({message : 'Comment modified !'}))
    .catch(error => res.status(400).json({ error })); 
        
};

// Définition et export de la logique métier appliquée à la route get qui renvoie le commentaire avec l'ID fourni
exports.getOneComment = (req, res, next) => {      
    Comments.findOne({
        where: { id: req.params.id },
        include: [{
            model: User
        }]
        })
        .then(
            function(comment) { res.status(200).json(comment) },
            function(error) { res.status(404).json({ error }) }
        );
             
};

// Définition et export de la logique métier appliquée à la route delete qui supprime le commentaire avec l'ID fourni
exports.deleteComment = (req, res, next) => {
    Comments.findOne({
        where: { id: req.params.id }        
        })
        .then(comment => {
            comment.destroy({ id: req.params.id })
                .then(() => res.status(200).json({message : 'Comment deleted !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));       
};


// Définition et export de la logique métier appliquée à la route get qui renvoie le tableau de tous les commentaires dans la base de données 
exports.getAllComments = (req, res, next) => {
    Comments.findAll({
        where: { postId: req.params.postId },
        include: [{            
            model: User
        }],
        order: [['createdAt', 'DESC']]
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};
