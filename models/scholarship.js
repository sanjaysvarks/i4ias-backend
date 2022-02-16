'use strict';
module.exports = (sequelize, DataTypes) => {
  const scholarships = sequelize.define('scholarships', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    fullName: {
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
    course: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['male', 'female', 'other'],
    },
    dob: DataTypes.STRING,
    city: {
      type: DataTypes.STRING
    },
    graduation: {
      type: DataTypes.STRING
    },
    testMode: {
      type: DataTypes.ENUM,
      values: ['Online', 'Offline']
    },
    testCenter: {
      type: DataTypes.TEXT
    },
    govtIdType: {
      type: DataTypes.STRING
    },
    govtIdDetails: {
      type: DataTypes.STRING
    },
    tcFlag: {
      type: DataTypes.STRING,
      defaultValue: 'Y'
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
  scholarships.associate = function (models) {
    // associations can be defined here
  };
  return scholarships;
};