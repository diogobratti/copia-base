'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      street: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING
      },
      complement: {
        type: Sequelize.STRING
      },
      neighborhood: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      cityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cities',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      zip: {
        type: Sequelize.STRING
      },
      main: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.bulkInsert('Addresses', [{
      street: 'Rua dos Bobos',
      userId: 1,
      cityId: 4506,
      main: true,
      zip: '880752920',
      number: '666',
      complement: 'apto 00',
      neighborhood: 'Estreito',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Addresses');
  }
};