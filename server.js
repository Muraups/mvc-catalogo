const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');
const artistRoutes = require('./routes/artistRoutes'); 
const genreRoutes = require('./routes/genreRoutes'); 
const { Track, Album, Artist } = require('./models');
const { sequelize } = require('./models/index'); 


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
            include: [Artist],
          },
        ],
      });
  
      console.log(tracks); 
      res.json(tracks); 
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
            model: Artist, 
            as: 'Artist', 
          },
        ],
      });
      res.json(albums); 
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
