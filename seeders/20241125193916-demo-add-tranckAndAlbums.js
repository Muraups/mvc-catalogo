'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Inserindo Álbuns com o campo release_year
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
          album_id: 1, // Relacionando faixa ao álbum "A Night at the Opera"
          createdAt: new Date(), 
          updatedAt: new Date(),
          duration: 5.55, // Duração em minutos (exemplo)
          genre_id: 1
        },
        { 
          title: 'Love of My Life', 
          album_id: 1, // Relacionando faixa ao álbum "A Night at the Opera"
          createdAt: new Date(), 
          updatedAt: new Date(),
          duration: 4.23, // Duração em minutos (exemplo)
          genre_id: 1
        },
  
        // Faixas para "21" (álbum de Adele)
        { 
          title: 'Rolling in the Deep', 
          album_id: 2, // Relacionando faixa ao álbum "21"
          createdAt: new Date(), 
          updatedAt: new Date(),
          duration: 3.48, // Duração em minutos (exemplo)
          genre_id: 2
        },
        { 
          title: 'Someone Like You', 
          album_id: 2, // Relacionando faixa ao álbum "21"
          createdAt: new Date(), 
          updatedAt: new Date(),
          duration: 4.45, // Duração em minutos (exemplo)
          genre_id: 2
        },
      ]);
  },

  async down(queryInterface, Sequelize) {
    // Deletando Faixas e Álbuns
    await queryInterface.bulkDelete('Tracks', null, {});
    await queryInterface.bulkDelete('Albums', null, {});
  },
};
