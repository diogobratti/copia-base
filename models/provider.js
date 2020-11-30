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
      models.Provider.belongsTo(models.City);
    }
  };
  Provider.init({
    name: DataTypes.STRING,
    agent: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    isStarred: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Provider',
    paranoid: true,
  });
  return Provider;
};