'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    fName: {
      type: DataTypes.STRING,
      allowNull: false
    },
	  lName: {
      type: DataTypes.STRING,
      allowNull: true
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
    password: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['male', 'female', 'other'],
    },
    role: {
      type: DataTypes.ENUM,
      values: ['student', 'content_team', 'admin'],
    },
	 dob: DataTypes.STRING,
    address: {
      type: DataTypes.TEXT
    },
    pincode: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.STRING,
      defaultValue: 'Y'
    },
    lastLogin: {
      type: DataTypes.DATE
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    freezeTableName: true,

  }
  );

  User.associate = function (models) {
    // associations can be defined here
    
  };
  return User;

};
