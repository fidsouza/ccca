'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_items', {
      id_order: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.BIGINT(11)
      },
      id_item: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_items');
  }
};
