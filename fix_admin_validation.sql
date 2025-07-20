-- =====================================================
-- CORRECTION DES POLITIQUES RLS POUR LA VALIDATION ADMIN
-- =====================================================

-- Supprimer les politiques existantes qui peuvent entrer en conflit
DROP POLICY IF EXISTS "Permettre la lecture des lieux validés" ON lieux;
DROP POLICY IF EXISTS "Permettre la lecture de tous les lieux" ON lieux;

-- Politique pour permettre la lecture des lieux validés par tous les utilisateurs
CREATE POLICY "Permettre la lecture des lieux validés" ON lieux
    FOR SELECT USING (est_valide = true);

-- Politique pour permettre la lecture de tous les lieux par les admins
CREATE POLICY "Permettre la lecture de tous les lieux par les admins" ON lieux
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = auth.uid() 
            AND user_profiles.role_id = (SELECT id FROM roles WHERE label = 'admin')
        )
    );

-- Politique pour permettre la mise à jour des lieux par les admins
CREATE POLICY "Permettre la mise à jour des lieux par les admins" ON lieux
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = auth.uid() 
            AND user_profiles.role_id = (SELECT id FROM roles WHERE label = 'admin')
        )
    );

-- Politique pour permettre l'insertion de lieux par les contributeurs et admins
CREATE POLICY "Permettre l'insertion de lieux" ON lieux
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = auth.uid() 
            AND user_profiles.role_id IN (
                SELECT id FROM roles WHERE label IN ('admin', 'contributor')
            )
        )
    );

-- Politique pour permettre la suppression de lieux par les admins
CREATE POLICY "Permettre la suppression de lieux par les admins" ON lieux
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = auth.uid() 
            AND user_profiles.role_id = (SELECT id FROM roles WHERE label = 'admin')
        )
    ); 