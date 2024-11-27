'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserir Gêneros
    await queryInterface.bulkInsert('Genres', [
      { name: 'Rock', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pop', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hip-Hop', createdAt: new Date(), updatedAt: new Date() },
    ], {});

    // Obter os Gêneros
    const genres = await queryInterface.sequelize.query(
      `SELECT id, name FROM Genres WHERE name IN ('Rock', 'Pop', 'Hip-Hop')`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Inserir Artistas
    await queryInterface.bulkInsert('Artists', [
      { name: 'The Beatles', genre_id: genres.find(g => g.name === 'Rock').id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Adele', genre_id: genres.find(g => g.name === 'Pop').id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kendrick Lamar', genre_id: genres.find(g => g.name === 'Hip-Hop').id, createdAt: new Date(), updatedAt: new Date() },
    ], {});

    // Obter os Artistas
    const artists = await queryInterface.sequelize.query(
      `SELECT id, name FROM Artists WHERE name IN ('The Beatles', 'Adele', 'Kendrick Lamar')`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Inserir Álbuns
    await queryInterface.bulkInsert('Albums', [
      { 
        title: 'Abbey Road', 
        artist_id: artists.find(a => a.name === 'The Beatles').id, 
        release_year: 1969,
        cover_image: 'https://i.discogs.com/M2yc5OJZPdVoDm2_UlRRXuDlDguamLLSdnbziNmZoQI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI2MDc0/MjQtMTYzMDYwMTA4/Ny0xMTk5LmpwZWc.jpeg',
        createdAt: new Date(), updatedAt: new Date() 
      },
      { 
        title: 'Let It Be', 
        artist_id: artists.find(a => a.name === 'The Beatles').id, 
        release_year: 1970,
        cover_image: 'https://i.discogs.com/NZ8DyPsE89dmZaZYwSJ0xtrL_QyK8ZRFwLrZeB3YLGE/rs:fit/g:sm/q:90/h:583/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwODgx/MjYtMTI1Njk1MTAx/Ni5qcGVn.jpeg',
        createdAt: new Date(), updatedAt: new Date() 
      },
      { 
        title: '21', 
        artist_id: artists.find(a => a.name === 'Adele').id, 
        release_year: 2011,
        cover_image: 'https://i.discogs.com/pbgKc7liXRhTdGM1zNhToDidUDYjK7_CQsxNaXxQTtE/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI2NjQ1/ODktMTQ1MjI2OTk5/NS03Mjk4LnBuZw.jpeg',
        createdAt: new Date(), updatedAt: new Date() 
      },
      { 
        title: '25', 
        artist_id: artists.find(a => a.name === 'Adele').id, 
        release_year: 2015,
        cover_image: 'https://i.discogs.com/KiwJh98w6VmthGh7VIL_rg78ZpIQW3exFtcWuESdJGo/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc3NDc4/OTgtMTQ0Nzk1NzQ5/OC04NTc4LmpwZWc.jpeg',
        createdAt: new Date(), updatedAt: new Date() 
      },
      { 
        title: 'DAMN.', 
        artist_id: artists.find(a => a.name === 'Kendrick Lamar').id, 
        release_year: 2017,
        cover_image: 'https://i.discogs.com/n9BtVuF-dJtmghgg5MhBtN_nME-Wqb4SboSfeBxnWVE/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMTMz/NTM4LTE0OTIyMDQ5/NjMtMzE5Ni5qcGVn.jpeg',
        createdAt: new Date(), updatedAt: new Date() 
      },
      { 
        title: 'To Pimp a Butterfly', 
        artist_id: artists.find(a => a.name === 'Kendrick Lamar').id, 
        release_year: 2015,
        cover_image: 'https://i.discogs.com/mzZN2JyPeiMrz8YnZd04bKifNZ36K5zMECcfHvnTzFk/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc1NTc5/NTctMTQ0Mzk4MjAy/NC01NTk2LmpwZWc.jpeg',
        createdAt: new Date(), updatedAt: new Date() 
      },
    ], {});

    // Obter os Álbuns
    const albums = await queryInterface.sequelize.query(
      `SELECT id, title FROM Albums WHERE title IN ('Abbey Road', 'Let It Be', '21', '25', 'DAMN.', 'To Pimp a Butterfly')`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Inserir Faixas
    await queryInterface.bulkInsert('Tracks', [
      { title: 'Come Together', album_id: albums.find(a => a.title === 'Abbey Road').id, duration: 4.19, genre_id: genres.find(g => g.name === 'Rock').id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Something', album_id: albums.find(a => a.title === 'Abbey Road').id, duration: 3.03, genre_id: genres.find(g => g.name === 'Rock').id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Here Comes the Sun', album_id: albums.find(a => a.title === 'Abbey Road').id, duration: 3.06, genre_id: genres.find(g => g.name === 'Rock').id, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Let It Be', album_id: albums.find(a => a.title === 'Let It Be').id, duration: 4.03, genre_id: genres.find(g => g.name === 'Rock').id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Get Back', album_id: albums.find(a => a.title === 'Let It Be').id, duration: 3.35, genre_id: genres.find(g => g.name === 'Rock').id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'The Long and Winding Road', album_id: albums.find(a => a.title === 'Let It Be').id, genre_id: genres.find(g => g.name === 'Rock').id, duration: 3.38, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Rolling in the Deep', album_id: albums.find(a => a.title === '21').id, duration: 3.48, genre_id: genres.find(g => g.name === 'Pop').id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Someone Like You', album_id: albums.find(a => a.title === '21').id, duration: 4.45, genre_id: genres.find(g => g.name === 'Pop').id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Set Fire to the Rain', album_id: albums.find(a => a.title === '21').id, duration: 4.02, genre_id: genres.find(g => g.name === 'Pop').id, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Hello', album_id: albums.find(a => a.title === '25').id, duration: 4.55, genre_id: genres.find(g => g.name === 'Pop').id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'When We Were Young', album_id: albums.find(a => a.title === '25').id, duration: 4.50, genre_id: genres.find(g => g.name === 'Pop').id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Send My Love (To Your New Lover)', album_id: albums.find(a => a.title === '25').id, duration: 3.43, genre_id: genres.find(g => g.name === 'Pop').id, createdAt: new Date(), updatedAt: new Date() },

      { title: 'HUMBLE.', album_id: albums.find(a => a.title === 'DAMN.').id, duration: 2.57, genre_id: genres.find(g => g.name === 'Hip-Hop').id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'DNA.', album_id: albums.find(a => a.title === 'DAMN.').id, duration: 3.05, genre_id: genres.find(g => g.name === 'Hip-Hop').id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'LOYALTY.', album_id: albums.find(a => a.title === 'DAMN.').id, duration: 3.46, genre_id: genres.find(g => g.name === 'Hip-Hop').id, createdAt: new Date(), updatedAt: new Date() },

      { title: 'King Kunta', album_id: albums.find(a => a.title === 'To Pimp a Butterfly').id, duration: 3.54, genre_id: genres.find(g => g.name === 'Hip-Hop').id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Alright', album_id: albums.find(a => a.title === 'To Pimp a Butterfly').id, duration: 3.39, genre_id: genres.find(g => g.name === 'Hip-Hop').id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'The Blacker the Berry', album_id: albums.find(a => a.title === 'To Pimp a Butterfly').id, genre_id: genres.find(g => g.name === 'Hip-Hop').id, duration: 4.09, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tracks', null, {});
    await queryInterface.bulkDelete('Albums', null, {});
    await queryInterface.bulkDelete('Artists', null, {});
    await queryInterface.bulkDelete('Genres', null, {});
  }
};
