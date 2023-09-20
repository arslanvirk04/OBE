'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('courses', 'CLO');
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('courses', 'CLO', {
      type: Sequelize.STRING, 
    });
  },
};
