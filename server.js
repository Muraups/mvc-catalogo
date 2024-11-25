const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');
const artistRoutes = require('./routes/artistRoutes'); // Novas rotas de Artist
const genreRoutes = require('./routes/genreRoutes'); // Novas rotas de Genre
const sequelize = require('./database/db');

// Importa os modelos para aplicar associações
const { Album, Track, Artist, Genre } = require('./models/index');

// Cria o app e configura middlewares
const app = express();
app.use(bodyParser.json());
app.use(cors());

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/api/albums', albumRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/artists', artistRoutes); // Adiciona rotas de Artist
app.use('/api/genres', genreRoutes); // Adiciona rotas de Genre


app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo à API de Catálogo de Discos!',
        endpoints: {
            albums: '/api/albums',
            tracks: '/api/tracks',
            artists: '/api/artists',
            genres: '/api/genres'
        }
    });
});


// Sincroniza banco de dados e inicia o servidor
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced successfully!');
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}).catch((error) => {
    console.error('Failed to sync database:', error);
});
