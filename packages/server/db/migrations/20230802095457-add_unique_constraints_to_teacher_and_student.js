'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add unique constraint to the "email" column in the "teacher" table
    await queryInterface.changeColumn('teacher','fkUserId', {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true
    });

    // Add unique constraint to the "email" column in the "student" table
    await queryInterface.changeColumn('student','fkUserId' ,{
      type: Sequelize.UUID,
      allowNull: false,
      unique: true

    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove unique constraint from the "email" column in the "teacher" table
    await queryInterface.removeConstraint('teacher', 'unique_teacher_fkUserId');

    // Remove unique constraint from the "email" column in the "student" table
    await queryInterface.removeConstraint('student', 'unique_student_fkUserId');
  }
};
