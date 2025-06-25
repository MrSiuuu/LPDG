const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();

// Configuration de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());

// Routes d'authentification
app.post('/auth/register', async (req, res) => {
    try {
        const { email, password, nom, role = 'user' } = req.body;
        
        // Créer l'utilisateur dans Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password
        });

        if (authError) throw authError;

        // Récupérer l'ID du rôle
        const { data: roleData, error: roleError } = await supabase
            .from('roles')
            .select('id')
            .eq('label', role)
            .single();

        if (roleError) throw roleError;

        // Créer le profil utilisateur
        const { error: profileError } = await supabase
            .from('user_profiles')
            .insert({
                id: authData.user.id,
                nom,
                email,
                role_id: roleData.id
            });

        if (profileError) throw profileError;

        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        // Récupérer le profil utilisateur avec le rôle
        const { data: profile, error: profileError } = await supabase
            .from('user_profiles')
            .select(`
                *,
                roles (label)
            `)
            .eq('id', data.user.id)
            .single();

        if (profileError) throw profileError;

        res.json({
            user: data.user,
            profile,
            session: data.session
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Middleware d'authentification
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('Token manquant');

        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error) throw error;

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Non authentifié' });
    }
};

// Route protégée exemple
app.get('/profile', authenticateUser, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .select(`
                *,
                roles (label)
            `)
            .eq('id', req.user.id)
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Import des routes
const authRoutes = require('./routes/auth.routes');
const lieuxRoutes = require('./routes/lieux.routes');
const signalementsRoutes = require('./routes/signalements.routes');

// Montage des routes
app.use('/api/auth', authRoutes);
app.use('/api/lieux', lieuxRoutes);
app.use('/api/signalements', signalementsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
}); 