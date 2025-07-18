-- =====================================================
-- POLITIQUES RLS POUR LA TABLE AVIS
-- =====================================================

-- Activer RLS sur la table avis
ALTER TABLE avis ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLITIQUES POUR LA TABLE avis
-- =====================================================

-- Politique pour permettre la lecture de tous les avis (pour les afficher)
CREATE POLICY "Permettre la lecture des avis" ON avis
    FOR SELECT USING (true);

-- Politique pour permettre l'ajout d'avis (utilisateur connecté uniquement)
CREATE POLICY "Permettre l'ajout d'avis" ON avis
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Politique pour permettre la modification de ses propres avis
CREATE POLICY "Permettre la modification de ses avis" ON avis
    FOR UPDATE USING (auth.uid() = user_id);

-- Politique pour permettre la suppression de ses propres avis
CREATE POLICY "Permettre la suppression de ses avis" ON avis
    FOR DELETE USING (auth.uid() = user_id); 