'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('UserTest', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        bio: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return User;
};