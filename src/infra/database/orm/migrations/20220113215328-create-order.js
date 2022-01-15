'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_order: {
        type: Sequelize.BIGINT(11)
      },
      coupon: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      issue_date: {
        type: Sequelize.DATE
      },
      freight: {
        type: Sequelize.INTEGER
      },
      sequence: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  }
};
