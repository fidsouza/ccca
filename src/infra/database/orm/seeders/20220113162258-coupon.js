'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('coupons', [
      {
        code: 'VALE20',
        percentage: 20,
        expire_date: '2023-10-10T10:00:00'
      },
      {
        code: 'VALE20_EXPIRED ',
        percentage: 20,
        expire_date: '2020-10-10T10:00:00'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('items', null, {});
  }
};
