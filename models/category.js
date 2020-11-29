'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Category.belongsTo(models.Category);
      models.Category.hasMany(models.Category);
      models.Category.hasMany(models.Product);
      models.Category.hasMany(models.Provider);
    }
  };
  Category.init({
    name: DataTypes.STRING,
    level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
    paranoid: true,
  });
  return Category;
};