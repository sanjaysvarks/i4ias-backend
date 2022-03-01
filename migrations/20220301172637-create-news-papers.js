'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('newsPapers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      newsPaperName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT('LONG')
      },
      content: {
        type: Sequelize.TEXT('LONG')
      },
      createdDate: {
        type: 'TIMESTAMP',
        allowNull: false
      },
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('newsPapers');
  }
};