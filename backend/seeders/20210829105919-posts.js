'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Posts", [
      {
      imageUrl: "url post 1",
      content: "This post 1 is a test",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      imageUrl: "url post 2",
      content: "This post 2 is a test",
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
