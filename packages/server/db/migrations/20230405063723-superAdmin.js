'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{

      name: 'superAdmin',
      // role :' typeof of user',
      gender: 'male',
      dob: '1990-01-01',
      email: 'ken@example.com',
      contactNo: '123',
      address: 'pakistan',
      physicalAddress: 'pakistan',
      password: '1122',
      "createdAt": new Date(),
      "updatedAt": new Date(),
      "deletedAt": new Date(),
    }])


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {})


  }
};
