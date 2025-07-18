-- =====================================================
-- SUPPRESSION DES POLITIQUES RLS
-- =====================================================

-- Supprimer les politiques de likes_lieu
DROP POLICY IF EXISTS "Permettre la lecture des likes" ON likes_lieu;
DROP POLICY IF EXISTS "Permettre l'insertion de likes" ON likes_lieu;
DROP POLICY IF EXISTS "Permettre la suppression de likes" ON likes_lieu;

-- Supprimer les politiques de lieux_visites
DROP POLICY IF EXISTS "Permettre la lecture des visites" ON lieux_visites;
DROP POLICY IF EXISTS "Permettre l'insertion de visites" ON lieux_visites;
DROP POLICY IF EXISTS "Permettre la suppression de visites" ON lieux_visites;

-- Supprimer les politiques de lieux
DROP POLICY IF EXISTS "Permettre la lecture des lieux validés" ON lieux;
DROP POLICY IF EXISTS "Permettre la lecture de tous les lieux" ON lieux;

-- Supprimer les politiques de user_profiles
DROP POLICY IF EXISTS "Permettre la lecture des profils" ON user_profiles;
DROP POLICY IF EXISTS "Permettre la mise à jour de son profil" ON user_profiles;

-- Supprimer les politiques de photos_lieu
DROP POLICY IF EXISTS "Permettre la lecture des photos" ON photos_lieu;

-- Supprimer les politiques de restaurants
DROP POLICY IF EXISTS "Permettre la lecture des restaurants" ON restaurants;

-- =====================================================
-- DÉSACTIVER RLS (optionnel)
-- =====================================================

-- Désactiver RLS sur toutes les tables
ALTER TABLE likes_lieu DISABLE ROW LEVEL SECURITY;
ALTER TABLE lieux_visites DISABLE ROW LEVEL SECURITY;
ALTER TABLE lieux DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE photos_lieu DISABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants DISABLE ROW LEVEL SECURITY; 