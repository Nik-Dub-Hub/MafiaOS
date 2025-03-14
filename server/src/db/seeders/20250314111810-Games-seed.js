'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Games",
      [
        {
          id: 4,
          owner_id: 2,
          phase: "waiting",
          key: "sdkjvnsvn",
          discussionTime: 5,
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
