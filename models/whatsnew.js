'use strict';
module.exports = (sequelize, DataTypes) => {
  const whatsNews = sequelize.define('whatsNews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
    },
    editor: {
      type: DataTypes.TEXT('LONG')
    },
    pdfUpload: {
      type: DataTypes.STRING
    },
    s3FileKey: {
      type: DataTypes.STRING
    },
    hyperLink: {
      type: DataTypes.STRING
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    whatsNewDate: {
      allowNull: false,
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
  }, {});
  whatsNews.associate = function (models) {
    // associations can be defined here
  };
  return whatsNews;
};