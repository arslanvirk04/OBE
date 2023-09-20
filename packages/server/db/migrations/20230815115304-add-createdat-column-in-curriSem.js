'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the createdAt column
    await queryInterface.addColumn('curriculumSemesters', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.addColumn('curriculumSemesterCourses', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the createdAt column
    await queryInterface.removeColumn('curriculumSemesters', 'createdAt');
    await queryInterface.removeColumn('curriculumSemesterCourses', 'createdAt');
  },
};
