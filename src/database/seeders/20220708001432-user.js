'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email: 'gtadobairro345@gmail.com',
      password: 'Pizza3025$'
    },
    {
      name: 'Maria Doe',
      email: 'mariadoe@gmail.com',
      password: 'Pizza3089$'
    }],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
