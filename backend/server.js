const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const lieuxRoutes = require('./routes/lieux');

app.use('/api/auth', authRoutes);
app.use('/api/lieux', lieuxRoutes);

module.exports = app; 