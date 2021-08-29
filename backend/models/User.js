'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: 'userId'
      });
      // User.hasMany(models.Post);
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
			required: true
    },
      lastName: {
      type: DataTypes.STRING,
      allowNull: false,
			required: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      required: true
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    allowNull: false,
		required: true
  });
  return User;
};