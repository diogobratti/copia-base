'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.ProductGroup.belongsTo(models.Category);
      models.ProductGroup.belongsTo(models.ProductGroup);
      models.ProductGroup.hasMany(models.ProductGroup);
      models.ProductGroup.hasMany(models.Product);
    }
  };
  ProductGroup.init({
    name: DataTypes.STRING,
    level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductGroup',
  });
  return ProductGroup;
};