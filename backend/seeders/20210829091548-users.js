'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Jerome',
      lastName: 'Dubois',
      email: 'jerome.dubois@gmail.com',
      password: 'ajekjfkeajf324!',
      admin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@gmail.com',
      password: '294898gjjg*$',
      admin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
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
    return queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
