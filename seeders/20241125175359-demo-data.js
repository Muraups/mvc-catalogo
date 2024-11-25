'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Genres', [
      { name: 'Rock', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pop', createdAt: new Date(), updatedAt: new Date() },
    ]);

    await queryInterface.bulkInsert('Artists', [
      { name: 'Queen', genre_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Adele', genre_id: 2, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Genres', null, {});
    await queryInterface.bulkDelete('Artists', null, {});
  },
};
