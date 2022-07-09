'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('favorites', [{
      userId: 1,
      announcementId: 1,
    },
    {
      userId: 2,
      announcementId: 3,
    },{
      userId: 3,
      announcementId: 1,
    }],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('favorites', null, {})
  }
}
