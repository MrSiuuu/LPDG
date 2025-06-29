require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Configuration CORS pour la production
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Importation des routes
const authRoutes = require('./routes/auth.routes');
const testRoutes = require('./routes/test.routes');
const lieuxRoutes = require('./routes/lieux.routes');
const articlesRoutes = require('./routes/articles.routes');
const signalementsRoutes = require('./routes/signalements.routes');

// Nouvelles routes pour les fonctionnalités enrichies
const videosRoutes = require('./routes/videos.routes');
const evenementsRoutes = require('./routes/evenements.routes');
const contactsRoutes = require('./routes/contacts.routes');

app.use('/api/auth', authRoutes);
app.use('/api/lieux', lieuxRoutes);
app.use('/api', testRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/signalements', signalementsRoutes);

// Nouvelles routes
app.use('/api/videos', videosRoutes);
app.use('/api/evenements', evenementsRoutes);
app.use('/api/contacts', contactsRoutes);

app.get('/', (req, res) => {
  res.send('API LPDG opérationnelle !');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 