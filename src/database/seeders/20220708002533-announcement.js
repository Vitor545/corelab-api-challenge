'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('announcements', [{
      name: 'Uno',
      brand: 'Fiat',
      color: '#FFFFFF',
      year: '2022',
      board: 'PCD21511',
      description: 'Carro espaçoso e nunca deu problema.',
      priceMin: '8000',
      priceMax: '15000',
      userId: 1
    }, {
      name: 'Gol',
      brand: 'Volkswagen',
      color: '#FE6F5E',
      year: '2012',
      board: 'CSSA65511',
      description: 'Carro espaçoso e nunca deu problema.',
      priceMin: '16000',
      priceMax: '30000',
      userId: 2

    }, {
      name: 'Corolla',
      brand: 'Toyota',
      color: '#6f5efe',
      year: '2015',
      board: 'FCA21511',
      description: 'Carro espaçoso e nunca deu problema.',
      priceMin: '25000',
      priceMax: '40000',
      userId: 2

    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('announcements', null, {})
  }
}
