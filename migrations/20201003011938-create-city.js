'use strict';

const brazilianStates = require('../data/brazilianStatesAndCities.json');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      stateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'States',
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
    let cities = [];
    await brazilianStates["estados"].forEach((state, stateId) => 
        state["cidades"].forEach(city => 
          cities.push({
            name: city,
            stateId: stateId+1,
            createdAt: new Date(),
            updatedAt: new Date()
          })
      ));
    await queryInterface.bulkInsert('Cities', cities);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cities');
  }
};