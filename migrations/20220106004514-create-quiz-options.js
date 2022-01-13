'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('quizOptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quizId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      quizQuestionId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      optionContent: {
        allowNull: false,
        type: Sequelize.TEXT('LONG')
      },
      seqno : {
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('quizOptions');
  }
};