'use strict';
module.exports = (sequelize, DataTypes) => {
  const quizOptions = sequelize.define('quizOptions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quizId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    quizQuestionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    optionContent: {
      allowNull: false,
      type: DataTypes.TEXT('LONG')
    },
    seqno: {
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
   quizOptions.associate = function (models) {
    models.quizOptions.belongsTo(models.quizQuestion, {
      foreignKey: 'quizQuestionId',
      as : 'Options'
     });
    // models.quizOptions.belongsTo(models.quiz, {
    //   foreignKey: 'quizId',
    //   as : 'Questions'
    // });
   

  };
  return quizOptions;
};

