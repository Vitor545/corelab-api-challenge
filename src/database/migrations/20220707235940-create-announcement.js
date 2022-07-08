'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('announcements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false
      },
      board: {
        type: Sequelize.STRING,
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      priceMax: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      priceMin: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: 'TIMESTAMP'
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: 'TIMESTAMP'
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('announcements')
  }
}
