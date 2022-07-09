const bcrypt = require('bcryptjs')

'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email: 'gtadobairro345@gmail.com',
      password: bcrypt.hashSync('Pizza3025$', 10)
    },
    {
      name: 'Maria Doe',
      email: 'mariadoe@gmail.com',
      password: bcrypt.hashSync('Pizza3089$', 10)
    },
    {
      name: 'Mari Doe',
      email: 'marie@gmail.com',
      password: bcrypt.hashSync('Pizza3089$', 10)
    }],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
