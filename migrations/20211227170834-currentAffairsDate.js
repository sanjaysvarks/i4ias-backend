'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.changeColumn('currentAffairs', 'currentAffairsDate', Sequelize.DATE),
    queryInterface.changeColumn('currentAffairs', 'content', Sequelize.TEXT('long'))
    ])
  },

  down: (queryInterface, Sequelize) => {
  //   return Promise.all([
  //   queryInterface.removeColumn('currentAffairs','currentAffairsDate'),
  //   queryInterface.removeColumn('currentAffairs','content')
  // ])
  }
};
