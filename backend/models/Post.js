'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {

        static associate(models) {
            // définition de l'association ici
            Post.belongsTo(models.User, {
                  foreignKey: 'userId',
            })
        }

    }

    Post.init({
    // Model attributes are defined here
            userId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            contentPost: {
                type: DataTypes.TEXT
                // allowNull defaults to true
            },
            imageUrl: {
                type: DataTypes.STRING
                // allowNull defaults to true
            }
        }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Post' // We need to choose the model name
    });

    return Post;
}