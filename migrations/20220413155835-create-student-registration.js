'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('studentRegistrations', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        isEmail: true,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      testType: {
        type: Sequelize.ENUM,
        values: ['UPSC','KPSC'],
      },
      testMode: {
        type: Sequelize.ENUM,
        values: ['Online', 'Offline'],
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      flag:{
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('studentRegistrations');
  }
};