// Import du schéma de données User défini comme modèle via Sequelize

const db = require('../models');
const { User, Post } = db.sequelize.models;

// Import du package de chiffrement bcrypt
const bcrypt = require('bcrypt');

// Import de la bibliothèque JavaScript de normes cryptographiques crypto-js
// const CryptoJS = require("crypto-js");

// Import du package pour pouvoir créer et vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Définition et export des différentes logiques métier correspondant à chacune des routes

// Définition et export de la logique métier de la route post qui chiffre le mot de passe de l'utilisateur,
// ajoute l'utilisateur à la base de données
exports.register = (req, res, next) => {
    console.log("req.body",req.body);
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+[a-zA-Z0-9-]+)/;
    
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ error: 'Votre email n\'est pas valide !'})
    } else {

        User.findOne({
            where: { email: req.body.email },
            })        
            .then(user => {
                
                   if (!user) {
                    bcrypt.hash(req.body.password, 10)
                    .then(hash => {           
                        // Création du nouvel utilisateur avec le mot de passe haché
                        const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                        .then(() => res.status(201).json({ message: 'User created !' }))
                        .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
                   } else {
                    res.status(409).json({ error: 'Cette utilisateur existe déjà ' })
                   }
    
            })
            .catch(error => res.status(500).json({ error }));        
    }
     
};

/* Définition et export de la logique métier de la route post qui vérifie les informations d'identification de l'utilisateur, en renvoyant l'identifiant userID depuis la base de données et un jeton Web JSON signé (contenant également l'identifiant userID)*/
exports.login = (req, res, next) => {
    
    User.findOne({
        where: { email: req.body.email },
        })        
        .then(user => {
            console.log("user.email", user.email)
            console.log("req.body.password", req.body.password)
            console.log("user.password", user.password)
            if (!user) {
                return res.status(401).json({ error: 'User not found !' })
            }            
            bcrypt.compare(req.body.password, user.password)
               .then(valid => {                   
                   if (!valid) {
                    return res.status(401).json({ error: 'Password incorrect !' })
                   }
                   res.status(200).json({
                       userId: user.id,
                       token: jwt.sign(
                           { userId: user.id },
                           'RANDOM_TOKEN_SECRET',
                           { expiresIn: '24h' }
                       ) 
                   });
               })
               .catch(error => res.status(500).json({ error }));

               console.log("req.headers", req.headers)

        })
        .catch(error => res.status(500).json({ error }));

};

// Définition et export de la logique métier appliquée à la route get qui renvoie le tableau de tous les users dans la base de données 
exports.getAllUsers = (req, res, next) => {
    User.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

// Définition et export de la logique métier appliquée à la route get qui renvoie le post avec l'ID fourni
exports.getOneUser = (req, res, next) => {      
    User.findOne({
        where: { id: req.params.id },
        // include: [
        //     {
        //         model: db.User
        //     }          
        // ]
        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
        
};

// Définition et export de la logique métier appliquée à la route delete qui supprime le user avec l'ID fourni
// exports.deleteUser = (req, res, next) => {
//     USer.findOne({ _id: req.params.id})
//         .then(user => {            
//                 User.deleteOne({ _id: req.params.id })
//                     .then(() => res.status(200).json({message : 'User deleted !'}))
//                     .catch(error => res.status(400).json({ error }));
//             });
//         })
//         .catch(error => res.status(500).json({ error }));       
// };


exports.getLoggedUser = (req, res, next) => {
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log("userId", userId);
    User.findOne({
        attributes: ['id', 'firstName','lastName','email'],
        where: { id: userId }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))

};

// Définition et export de la logique métier appliquée à la route get qui renvoie le tableau de toutes les posts dans la base de données 
exports.getUserAllPosts = (req, res, next) => {
    Post.findAll({
        where: { userId: req.params.id },
        include: [{
            model: User,
            attributes: ['firstName','lastName']
        }]
        }
        )
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};