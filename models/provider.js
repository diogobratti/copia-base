'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Provider.hasMany(models.Product);
      models.Provider.belongsTo(models.Category);
    }
  };
  Provider.init({
    name: DataTypes.STRING,
    agent: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Provider',
    paranoid: true,
  });
  return Provider;
};