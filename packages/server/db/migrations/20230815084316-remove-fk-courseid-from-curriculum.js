'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('curriculum', 'fkCourseId');
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('curriculum', 'fkCourseId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'courses', 
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
};
