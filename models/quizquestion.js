'use strict';
module.exports = (sequelize, DataTypes) => {
  const quizQuestion = sequelize.define('quizQuestion', {
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
    answer: {
      allowNull: false,
      type: DataTypes.STRING
    },
    solution: {
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
  quizQuestion.associate = function (models) {
    // associations can be defined here
    models.quizQuestion.hasMany(models.quizOptions,{
      foreignKey: 'quizQuestionId',
      sourceKey: 'id',
      as : 'Options'
    }) 

    // models.quizQuestion.belongsTo(models.quiz, {
    //   foreignKey: 'quizId',
    //   as : 'Questions'
    // });

    
  };
  return quizQuestion;
};