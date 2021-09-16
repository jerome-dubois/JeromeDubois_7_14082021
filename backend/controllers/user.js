// Import du schéma de données User défini comme modèle via Sequelize

const db = require('../models');
const { User } = db.sequelize.models;

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
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+[a-zA-Z0-9-]+)/;
    
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ error: 'Votre email n\'est pas valide !'})
    } else {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Masquage de l'email avec la librairie crypto-js par chiffrement avec la méthode HmacSHA512
            // const emailCryptoJs = CryptoJS.HmacSHA512(req.body.email, `${process.env.CRYPTOJS_SECRET_KEY}`).toString();
            // console.log(emailCryptoJs); 
            // Création du nouvel utilisateur avec l'email masqué et le mot de passe haché
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
    }
     
};

// Définition et export de la logique métier de la route post qui vérifie les informations d'identification de l'utilisateur, 
// en renvoyant l'identifiant userID depuis la base de données et un jeton Web JSON signé (contenant également l'identifiant userID)
exports.login = (req, res, next) => {
    // const emailCryptoJs = CryptoJS.HmacSHA512(req.body.email, `${process.env.CRYPTOJS_SECRET_KEY}`).toString();

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'User not found !' })
            }
            bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                    return res.status(401).json({ error: 'Password incorrect !' })
                   }
                   res.status(200).json({
                       userId: user._id,
                       token: jwt.sign(
                           { userId: user._id },
                           'RANDOM_TOKEN_SECRET',
                           { expiresIn: '24h' }
                       ) 
                   });
               })
               .catch(error => res.status(500).json({ error }));

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