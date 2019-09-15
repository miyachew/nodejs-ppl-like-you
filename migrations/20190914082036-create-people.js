'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('peoples', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      latitude: {
        allowNull: false,
        type: Sequelize.DECIMAL(16, 8)
      },
      longitude: {
        allowNull: false,
        type: Sequelize.DECIMAL(16, 8)
      },
      monthlyIncome: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
      },
      experienced: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('peoples');
  }
};