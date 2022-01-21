'use strict';
module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define('questions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    categoryTypeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    tags: {
      type: DataTypes.STRING
    },
    quizId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    questionContent: {
      allowNull: false,
      type: DataTypes.TEXT('LONG')
    },
    optionA: {
      allowNull: false,
      type: DataTypes.TEXT('LONG')
    },
    optionB: {
      allowNull: false,
      type: DataTypes.TEXT('LONG')
    },
    optionC: {
      allowNull: false,
      type: DataTypes.TEXT('LONG')
    },
    optionD: {
      allowNull: false,
      type: DataTypes.TEXT('LONG')
    },
    answer: {
      allowNull: false,
      type: DataTypes.STRING
    },
    ansDescription: {
      type: DataTypes.TEXT('LONG')
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
  question.associate = function (models) {

    
  };
  return question;
};