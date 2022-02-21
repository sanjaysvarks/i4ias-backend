'use strict';
module.exports = (sequelize, DataTypes) => {
  const testimonials = sequelize.define('testimonials', {

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    designation: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT('LONG')
    },
    profileImage: {
      type: DataTypes.STRING
    },
    s3FileKey: {
      type: DataTypes.STRING
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
  testimonials.associate = function (models) {
    // associations can be defined here
  };
  return testimonials;
};