const { supabase } = require('../utils/supabaseClient');

async function signup(email, password, nom, role = 'user') {
  // Création de l'utilisateur dans Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
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

  return { message: 'Utilisateur créé avec succès' };
}

async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;

  // Récupérer le profil utilisateur avec le rôle
  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('*, roles (label)')
    .eq('id', data.user.id)
    .single();
  if (profileError) throw profileError;

  return {
    user: data.user,
    profile,
    session: data.session
  };
}

module.exports = { signup, login }; 