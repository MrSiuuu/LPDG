const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

exports.requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token d\'authentification manquant' });
    }
    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ message: 'Token invalide' });
    }
    // Récupérer le profil utilisateur avec le rôle
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*, roles(*)')
      .eq('id', user.id)
      .single();
    if (profileError || !profile) {
      return res.status(401).json({ message: 'Profil utilisateur non trouvé' });
    }
    req.user = {
      id: user.id,
      email: user.email,
      roles: profile.roles
    };
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    res.status(500).json({ message: 'Erreur lors de l\'authentification' });
  }
}; 