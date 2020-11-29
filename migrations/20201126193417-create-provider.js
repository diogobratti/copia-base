'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Providers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      agent: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
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
    await queryInterface.bulkInsert('Providers', [{
      name: 'Lanchonete da Esquina',
      agent: 'Machado de Assis',
      phone: '48 98765-4321',
      email: 'email@email.com',
      categoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Lanchonete da Outra Esquina',
      agent: 'Monteiro Lobato',
      phone: '48 98765-4321',
      email: 'email@email.com',
      categoryId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Loja da Avenida',
      agent: 'Saci Perere',
      phone: '48 98765-4321',
      email: 'email@email.com',
      categoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Providers');
  }
};