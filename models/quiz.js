'use strict';
module.exports = (sequelize, DataTypes) => {
  const quiz = sequelize.define('quiz', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quizName:  {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedAt'
    }
  } ,{ freezeTableName: true });
  quiz.associate = function(models) {
    // associations can be defined here
  };
  return quiz;
};
