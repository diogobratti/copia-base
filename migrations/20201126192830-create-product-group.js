'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductGroups', {
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
      productGroupId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'ProductGroups',
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
      }
    });
    await queryInterface.bulkInsert('ProductGroups', [{
      name: 'Prato principal',
      level: 1,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Bebidas',
      level: 1,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Roupa Social',
      level: 1,
      categoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Vestidos',
      level: 1,
      categoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProductGroups');
  }
};