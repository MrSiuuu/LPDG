-- =====================================================
-- POLITIQUES RLS POUR LES LIKES ET VISITES
-- =====================================================

-- Activer RLS sur les tables
ALTER TABLE likes_lieu ENABLE ROW LEVEL SECURITY;
ALTER TABLE lieux_visites ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLITIQUES POUR LA TABLE likes_lieu
-- =====================================================

-- Politique pour permettre la lecture des likes (pour compter)
CREATE POLICY "Permettre la lecture des likes" ON likes_lieu
    FOR SELECT USING (true);

-- Politique pour permettre l'insertion de likes (utilisateur connecté)
CREATE POLICY "Permettre l'insertion de likes" ON likes_lieu
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Politique pour permettre la suppression de likes (utilisateur connecté)
CREATE POLICY "Permettre la suppression de likes" ON likes_lieu
    FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- POLITIQUES POUR LA TABLE lieux_visites
-- =====================================================

-- Politique pour permettre la lecture des visites (pour vérifier)
CREATE POLICY "Permettre la lecture des visites" ON lieux_visites
    FOR SELECT USING (true);

-- Politique pour permettre l'insertion de visites (utilisateur connecté)
CREATE POLICY "Permettre l'insertion de visites" ON lieux_visites
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Politique pour permettre la suppression de visites (utilisateur connecté)
CREATE POLICY "Permettre la suppression de visites" ON lieux_visites
    FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- POLITIQUES POUR LA TABLE lieux (si pas déjà configurée)
-- =====================================================

-- S'assurer que RLS est activé sur lieux
ALTER TABLE lieux ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture des lieux validés
CREATE POLICY "Permettre la lecture des lieux validés" ON lieux
    FOR SELECT USING (est_valide = true);

-- Politique pour permettre la lecture de tous les lieux (pour les admins)
CREATE POLICY "Permettre la lecture de tous les lieux" ON lieux
    FOR SELECT USING (true);

-- =====================================================
-- POLITIQUES POUR LA TABLE user_profiles
-- =====================================================

-- S'assurer que RLS est activé sur user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture des profils
CREATE POLICY "Permettre la lecture des profils" ON user_profiles
    FOR SELECT USING (true);

-- Politique pour permettre la mise à jour de son propre profil
CREATE POLICY "Permettre la mise à jour de son profil" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- =====================================================
-- POLITIQUES POUR LA TABLE photos_lieu
-- =====================================================

-- S'assurer que RLS est activé sur photos_lieu
ALTER TABLE photos_lieu ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture des photos
CREATE POLICY "Permettre la lecture des photos" ON photos_lieu
    FOR SELECT USING (true);

-- =====================================================
-- POLITIQUES POUR LA TABLE restaurants
-- =====================================================

-- S'assurer que RLS est activé sur restaurants
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture des restaurants
CREATE POLICY "Permettre la lecture des restaurants" ON restaurants
    FOR SELECT USING (true); 