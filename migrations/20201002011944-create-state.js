'use strict';

const brazilianStates = require('../data/brazilianStatesAndCities.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('States', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      acronym: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      countryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Countries',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
    let states = [];
    await brazilianStates["estados"].forEach(state => 
        states.push({
          name: state.nome,
          acronym: state.sigla,
          countryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      );
    await queryInterface.bulkInsert('States', states);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('States');
  }
};