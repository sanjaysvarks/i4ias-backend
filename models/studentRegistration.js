'use strict';
module.exports = (sequelize, DataTypes) => {
  const studentRegistrations = sequelize.define('studentRegistrations', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    testType: {
      type: DataTypes.ENUM,
      values: ['UPSC', 'KPSC'],
    },
    testMode: {
      type: DataTypes.ENUM,
      values: ['Online', 'Offline'],
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
  studentRegistrations.associate = function(models) {
    // associations can be defined here
  };
  return studentRegistrations;
};