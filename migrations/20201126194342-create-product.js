'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      purchasePrice: {
        type: Sequelize.FLOAT
      },
      salePrice: {
        type: Sequelize.FLOAT
      },
      promotionalSalePrice: {
        type: Sequelize.FLOAT
      },
      quantity: {
        type: Sequelize.INTEGER
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
      providerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Providers',
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
    await queryInterface.bulkInsert('Products', [{
      name: 'Burrito',
      description: 'Carne de gado',
      purchasePrice: 100.00,
      salePrice: 200.00,
      promotionalSalePrice: 150.00,
      quantity: null,
      categoryId: 3,
      providerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Taco',
      description: 'Carne de frango',
      purchasePrice: 110.00,
      salePrice: 210.00,
      promotionalSalePrice: 110.00,
      quantity: null,
      categoryId: 3,
      providerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'X-salada',
      description: 'Completo',
      purchasePrice: 100.00,
      salePrice: 200.00,
      promotionalSalePrice: 150.00,
      quantity: null,
      categoryId: 4,
      providerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Terno',
      description: 'Branco',
      purchasePrice: 100.00,
      salePrice: 200.00,
      promotionalSalePrice: 150.00,
      quantity: 5,
      categoryId: 5,
      providerId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Vestido',
      description: 'Azul',
      purchasePrice: 100.00,
      salePrice: 200.00,
      promotionalSalePrice: 150.00,
      quantity: 20,
      categoryId: 6,
      providerId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};