'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('products', "userId", {
      type: Sequelize.INTEGER
    });
    
    await queryInterface.addConstraint('products', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fK_products_userId_ref_users_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('products', 'fK_products_userId_ref_users_id');
    await queryInterface.removeColumn('products', 'userId');
  }
};
