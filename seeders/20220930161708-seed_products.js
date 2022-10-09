'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('products', [
    {
      name: 'mouse',
      madein: 'china',
      price: 300000,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 1
    },
    {
      name: 'keyboard',
      madein: 'china',
      price: 900000,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('products', null, {});
  }
};
