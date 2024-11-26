const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');
const artistRoutes = require('./routes/artistRoutes'); // Novas rotas de Artist
const genreRoutes = require('./routes/genreRoutes'); // Novas rotas de Genre
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

// Rotas para servir as páginas HTML
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
    res.sendFile(path.join(__dirname, 'index.html')); // Envia o arquivo HTML principal
  });
  
  app.get('/artists', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/artists.html')); // Envia o arquivo artists.html
  });

// Rota principal
/*app.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo à API de Catálogo de Discos!',
    endpoints: {
      albums: '/api/albums',
      tracks: '/api/tracks',
      artists: '/api/artists',
      genres: '/api/genres',
    },
  });
});*/

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
