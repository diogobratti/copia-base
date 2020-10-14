'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.State.hasMany(models.City);
      models.State.belongsTo(models.Country);
    }
  };
  State.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    acronym: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'State',
    paranoid: true,
  });
  return State;
};