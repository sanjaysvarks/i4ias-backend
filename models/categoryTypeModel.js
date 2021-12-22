'use strict';
module.exports = (sequelize, DataTypes) => {
  const categoryType = sequelize.define('categoryType', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    categoryName: DataTypes.STRING
  }, {});
  categoryType.associate = function(models) {
    // associations can be defined here
  };
  return categoryType;
};