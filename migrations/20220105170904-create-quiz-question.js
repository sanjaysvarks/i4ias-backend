'use strict';

const { LONG } = require("mysql/lib/protocol/constants/types");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('quizQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryTypeId:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tags :{
        type: Sequelize.STRING
      },
      quizId:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      questionContent:{
        allowNull: false,
        type: Sequelize.TEXT('LONG')
      },
      answer:{
        allowNull: false,
        type: Sequelize.STRING
      },
      solution:{
        type: Sequelize.TEXT('LONG')
      } , 
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('quizQuestions');
  }
};