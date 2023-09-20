'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update the "user" table to increase the size of the "address" field to 100 characters
    await queryInterface.changeColumn('users', 'address', {
      type: Sequelize.STRING(100),
      allowNull: true, // Set this to true if the address field allows NULL values
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes made in the "up" function (if necessary)
    await queryInterface.changeColumn('users', 'address', {
      type: Sequelize.STRING,
      allowNull: true, // Set this to true if the address field allows NULL values
    });
  }
};
