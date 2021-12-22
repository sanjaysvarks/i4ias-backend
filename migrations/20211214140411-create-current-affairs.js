'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('currentAffairs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      content : {
        type: Sequelize.TEXT
      },
      tags :{
        type: Sequelize.STRING
      },
      categoryType :{
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      lastUpdatedAt:{
        type: 'TIMESTAMP',
        allowNull: false
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
    return queryInterface.dropTable('currentAffairs');
  }
};