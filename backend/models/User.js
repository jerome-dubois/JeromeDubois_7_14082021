'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static associate(models) {
            // définition de l'association ici
            User.hasMany(models.Post, {
                  foreignKey: 'userId',
            })
        }

    }

    User.init({
    // Model attributes are defined here
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING
                // allowNull defaults to true
            },
            email: {
                type: DataTypes.STRING
                // allowNull defaults to true
            },
            password: {
                type: DataTypes.STRING
                // allowNull defaults to true
            }
        }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User' // We need to choose the model name
    });

    return User;
}