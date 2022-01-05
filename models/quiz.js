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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quizDate: {
      type: DataTypes.DATE
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
    models.quiz.hasOne(models.user, {
      foreignKey: 'id',
      sourceKey: 'userId',
      constraints: false,
      as: 'user'
    })
  };
  return quiz;
};
