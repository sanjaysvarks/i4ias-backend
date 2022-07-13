'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sliders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
	  heading: {
        type: Sequelize.STRING
      },
	  description :{
        type: Sequelize.TEXT
      },
	  imgUrl: {
        type: Sequelize.STRING
      },
    s3FileKey: {
        type: Sequelize.STRING
      },
	  isPrimary: {
        allowNull: false,
        type: Sequelize.ENUM('Y','N'),
        defaultVaue: 'Y'
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
      },
      isMobile: {
        allowNull: false,
        type: Sequelize.ENUM('Y','N'),
        defaultVaue: 'Y'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sliders');
  }
};