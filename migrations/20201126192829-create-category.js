'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.bulkInsert('Categories', [{
      name: 'Comida',
      level: 1,
      categoryId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Roupas',
      level: 1,
      categoryId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Mexicana',
      level: 2,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Fast Food',
      level: 2,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Masculina',
      level: 2,
      categoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Feminina',
      level: 2,
      categoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Categories');
  }
};