'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Albums', [
      { 
        title: 'A Night at the Opera', 
        artist_id: 1, 
        release_year: 1975, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }, // Queen
      { 
        title: '21', 
        artist_id: 2, 
        release_year: 2011, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }, // Adele
    ]);

    // Inserindo Faixas
      await queryInterface.bulkInsert('Tracks', [
        // Faixas para "A Night at the Opera" (álbum de Queen)
        { 
          title: 'Bohemian Rhapsody', 
          album_id: 1, 
          createdAt: new Date(), 
          updatedAt: new Date(),
          duration: 5.55, 
          genre_id: 1
        },
        { 
          title: 'Love of My Life', 
          album_id: 1, 
          createdAt: new Date(), 
          updatedAt: new Date(),
          duration: 4.23, 
          genre_id: 1
        },
  

        { 
          title: 'Rolling in the Deep', 
          album_id: 2, 
          createdAt: new Date(), 
          updatedAt: new Date(),
          duration: 3.48, 
          genre_id: 2
        },
        { 
          title: 'Someone Like You', 
          album_id: 2, 
          createdAt: new Date(), 
          updatedAt: new Date(),
          duration: 4.45, 
          genre_id: 2
        },
      ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tracks', null, {});
    await queryInterface.bulkDelete('Albums', null, {});
  },
};
