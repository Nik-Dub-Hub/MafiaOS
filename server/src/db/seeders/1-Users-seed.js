'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 2,
          username: "Katya",
          email: "katya@mail.com",
          password: 123,
          civilianCount: 3,
          mafiaCount: 2,
          doctorCount: 1,
          ladyCount: 0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Entries", null, {
      restartIdentity: true,
      truncate: true,
    });
  },
};
