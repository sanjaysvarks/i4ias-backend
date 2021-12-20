'use strict';
module.exports = (sequelize, DataTypes) => {
  const currentAffairs = sequelize.define('currentAffairs', {

    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.STRING
      },
      content : {
        type: DataTypes.TEXT
      },
      tags :{
        type: DataTypes.STRING
      },
      caType :{
        type: DataTypes.TEXT
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'createdAt'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedAt'
      },
  }, { freezeTableName: true});
  currentAffairs.associate = function(models) {
    // associations can be defined here
  };
  return currentAffairs;
};