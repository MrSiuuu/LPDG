require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Importation des routes (à ajouter plus tard)
const authRoutes = require('./routes/auth.routes');
const testRoutes = require('./routes/test.routes');
app.use('/api/auth', authRoutes);
app.use('/api', testRoutes);

app.get('/', (req, res) => {
  res.send('API JobPortal opérationnelle !');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 