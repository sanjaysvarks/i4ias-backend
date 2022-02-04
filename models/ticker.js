'use strict';
module.exports = (sequelize, DataTypes) => {
  const tickers = sequelize.define('tickers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
    },
    hyperLinkUrl: {
      type: DataTypes.STRING
    },
    documentUrl: {
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
  tickers.associate = function (models) {
    // associations can be defined here
  };
  return tickers;
};