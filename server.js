const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');
const artistRoutes = require('./routes/artistRoutes'); // Novas rotas de Artist
const genreRoutes = require('./routes/genreRoutes'); // Novas rotas de Genre
const { Track, Album, Artist } = require('./models');
const { sequelize } = require('./models/index'); // Importa o Sequelize e associações

// Cria o app e configura middlewares
const app = express();
app.use(bodyParser.json());
app.use(cors());

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/albums', albumRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/artists', artistRoutes); 
app.use('/api/genres', genreRoutes); 

app.get("/html/artists.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/artists.html"));
  });
  app.get("/html/albums.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/albums.html"));
  });
  app.get("/html/tracks.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/tracks.html"));
  });
  app.get("/html/genres.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/genres.html"));
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
  });
  
  app.get('/api/tracks', async (req, res) => {
    try {
      const tracks = await Track.findAll({
        include: [
          {
            model: Album,
            include: [Artist], // Inclui o Artista dentro do Álbum
          },
        ],
      });
  
      console.log(tracks); // Verifique os dados retornados no console
      res.json(tracks); // Envia as faixas com a duração e as associações
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao carregar faixas' });
    }
  });
  
  app.get('/api/albums', async (req, res) => {
    try {
      const albums = await Album.findAll({
        include: [
          {
            model: Artist, // Certifique-se de que é o modelo Artist e não Album
            as: 'Artist', // A associação que você fez com Artist (se necessário)
          },
        ],
      });
      res.json(albums); // Envia os álbuns com os dados do artista
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao carregar álbuns' });
    }
  });
  
  
  

  app.get('/artists', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/artists.html')); 
  });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully!');
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch((error) => {
    console.error('Failed to sync database:', error);
  });
