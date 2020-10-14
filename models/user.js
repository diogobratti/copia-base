'use strict';
const {
  Model
} = require('sequelize');
const { InvalidArgumentError } = require('../error/error');
const validation = require('../validation/validation-commom');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsTo(models.Role);
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING(64),
      is: /^[0-9a-f]{64}$/i
    }
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });
  function hashPasswordHook (instance, options) {
    if (!instance.changed('hashedPassword')) return ;
    const password = instance.getDataValue('hashedPassword');
    validation.notNullStringField(password, 'password');
    validation.minimumSizeField(password, 'password', 8);
    validation.maximumSizeField(password, 'password', 64);
    const rounds = 12;
    return bcrypt
      .hash(password, rounds)
      .then(hash => (instance.setDataValue('hashedPassword', hash)));
  }
  User.beforeCreate(hashPasswordHook);
  User.beforeUpdate(hashPasswordHook);
  return User;
};