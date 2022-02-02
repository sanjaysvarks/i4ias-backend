'use strict';
module.exports = (sequelize, DataTypes) => {
  const sliders = sequelize.define('sliders', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
	  heading: {
        type: DataTypes.STRING
      },
	  description :{
        type: DataTypes.TEXT
      },
	  imgUrl: {
        type: DataTypes.STRING
      },
    s3FileKey: {
        type: DataTypes.STRING
      },   
	  isPrimary: {
        allowNull: false,
        type: DataTypes.ENUM('Y','N'),
        defaultVaue: 'Y'
      },
	  userId: {
	    allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'createdAt'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedAt'
      }
	
  }, {});
  sliders.associate = function(models) {
    // associations can be defined here
  };
  return sliders;
};
