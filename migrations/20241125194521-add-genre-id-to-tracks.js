'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Tracks', 'genre_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Genres', 
        key: 'id',       
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tracks', 'genre_id');
  },
};
