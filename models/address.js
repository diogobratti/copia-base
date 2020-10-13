'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Address.init({
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: DataTypes.STRING,
    complement: DataTypes.STRING,
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    main: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Address',
    paranoid: true,
  });
  return Address;
};