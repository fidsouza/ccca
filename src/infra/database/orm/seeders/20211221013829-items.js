'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('items', [
      {
        category: 'Música',
        description: 'CD',
        price: 30,
        width: 10,
        height: 16,
        length: 20,
        weight: 1
      },
      {
        category: 'VIDEO',
        description: 'DVD',
        price: 50,
        width: 16,
        height: 20,
        length: 2
      },
      {
        category: 'VIDEO',
        description: 'VHS',
        price: 10
      },
      {
        category: 'Instrumentos Musicais',
        description: 'Guitarra',
        price: 1000,
        width: 100,
        height: 30,
        length: 10,
        weight: 3
      },
      {
        category: 'Instrumentos Musicais',
        description: 'Amplificador',
        price: 500,
        width: 100,
        height: 50,
        length: 50,
        weight: 20
      },
      {
        category: 'Acessórios',
        description: 'Cabo',
        price: 30,
        width: 10,
        height: 10,
        length: 10,
        weight: 0.9
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('items', null, {});
  }
};
