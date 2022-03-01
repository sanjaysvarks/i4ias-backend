'use strict';
module.exports = (sequelize, DataTypes) => {
  const newsPapers = sequelize.define('newsPapers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    newsPaperName: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT('LONG')
    },
    content: {
      type: DataTypes.TEXT('LONG')
    },
    createdDate: {
      allowNull: false,
      type: DataTypes.DATE
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
  newsPapers.associate = function (models) {
    // associations can be defined here
  };
  return newsPapers;
};