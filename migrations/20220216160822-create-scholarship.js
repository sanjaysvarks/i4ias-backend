'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('scholarships', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      fullName: {
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
      course: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['male', 'female', 'other'],
      },
      dob: Sequelize.STRING,
      city: {
        type: Sequelize.STRING
      },
      graduation: {
        type: Sequelize.STRING
      },
      testMode: {
        type: Sequelize.ENUM,
        values: ['Online', 'Offline']
      },
      testCenter: {
        type: Sequelize.TEXT
      },
      govtIdType: {
        type: Sequelize.STRING
      },
      govtIdDetails: {
        type: Sequelize.STRING
      },
      tcFlag: {
        type: Sequelize.STRING,
        defaultValue: 'Y'
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('scholarships');
  }
};