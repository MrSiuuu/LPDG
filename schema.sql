-- Table des rôles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion des rôles par défaut
INSERT INTO roles (label, description) VALUES
    ('user', 'Utilisateur simple'),
    ('contributor', 'Utilisateur contributeur'),
    ('blogger', 'Blogueur'),
    ('admin', 'Administrateur');

-- Table des profils utilisateurs liés à Supabase Auth
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nom TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    photo TEXT,
    adresse TEXT,
    ville TEXT,
    telephone TEXT,
    role_id INT REFERENCES roles(id) NOT NULL,
    compteur_visite INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des lieux touristiques
CREATE TABLE lieux (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL,
    type TEXT NOT NULL,
    ville TEXT NOT NULL,
    description TEXT,
    prix NUMERIC,
    adresse TEXT,
    latitude FLOAT,
    longitude FLOAT,
    image_principale TEXT,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    est_valide BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    images text[],
    -- Nouveaux champs pour les fonctionnalités enrichies
    accessible_mobilite_reduite BOOLEAN DEFAULT FALSE,
    reseaux_sociaux JSONB DEFAULT '{}',
    ressources JSONB DEFAULT '{}'
);

-- Table des photos ajoutées aux lieux
CREATE TABLE photos_lieu (
    id SERIAL PRIMARY KEY,
    lieu_id INT REFERENCES lieux(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des avis sur les lieux
CREATE TABLE avis (
    id SERIAL PRIMARY KEY,
    lieu_id INT REFERENCES lieux(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    note INT CHECK (note >= 1 AND note <= 5),
    commentaire TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des signalements
CREATE TABLE signalements (
    id SERIAL PRIMARY KEY,
    lieu_id INT REFERENCES lieux(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    motif TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des articles (blogs)
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    titre TEXT NOT NULL,
    contenu TEXT,
    meta_description TEXT,
    image_principale TEXT,
    tags TEXT[],
    slug TEXT UNIQUE,
    brouillon BOOLEAN DEFAULT TRUE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des commentaires sur les articles
CREATE TABLE commentaires_article (
    id SERIAL PRIMARY KEY,
    article_id INT REFERENCES articles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    texte TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    type TEXT,
    contenu TEXT,
    lu BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des lieux visités par les utilisateurs
CREATE TABLE lieux_visites (
    id SERIAL PRIMARY KEY,
    lieu_id INT REFERENCES lieux(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    date_visite TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(lieu_id, user_id)
);

-- Table des likes sur les lieux
CREATE TABLE likes_lieu (
    id SERIAL PRIMARY KEY,
    lieu_id INT REFERENCES lieux(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(lieu_id, user_id)
);

-- Table des likes sur les articles
CREATE TABLE likes_article (
    id SERIAL PRIMARY KEY,
    article_id INT REFERENCES articles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(article_id, user_id)
);

-- =====================================================
-- NOUVELLES TABLES POUR LES FONCTIONNALITÉS ENRICHIES
-- =====================================================

-- Table des vidéos de présentation des lieux
CREATE TABLE videos_lieu (
    id SERIAL PRIMARY KEY,
    lieu_id INT REFERENCES lieux(id) ON DELETE CASCADE,
    titre TEXT NOT NULL,
    description TEXT,
    url_video TEXT NOT NULL,
    type_video TEXT DEFAULT 'presentation',
    duree_secondes INT,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    est_principale BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des événements associés aux lieux
CREATE TABLE evenements_lieu (
    id SERIAL PRIMARY KEY,
    lieu_id INT REFERENCES lieux(id) ON DELETE CASCADE,
    titre TEXT NOT NULL,
    description TEXT,
    date_debut TIMESTAMP NOT NULL,
    date_fin TIMESTAMP,
    heure_debut TIME,
    heure_fin TIME,
    type_evenement TEXT DEFAULT 'general',
    prix_evenement NUMERIC,
    capacite_max INT,
    lieu_evenement TEXT,
    photo_evenement TEXT,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    est_actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des contacts référents des lieux
CREATE TABLE contacts_lieu (
    id SERIAL PRIMARY KEY,
    lieu_id INT REFERENCES lieux(id) ON DELETE CASCADE,
    nom_contact TEXT NOT NULL,
    fonction TEXT,
    telephone TEXT,
    email TEXT,
    type_contact TEXT DEFAULT 'referent',
    horaires_contact JSONB DEFAULT '{}',
    notes TEXT,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    est_principal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les performances
CREATE INDEX idx_videos_lieu_lieu_id ON videos_lieu(lieu_id);
CREATE INDEX idx_evenements_lieu_lieu_id ON evenements_lieu(lieu_id);
CREATE INDEX idx_contacts_lieu_lieu_id ON contacts_lieu(lieu_id);

-- ===========================================
-- TABLES POUR LA GESTION DES RESTAURANTS
-- ===========================================

-- Table des restaurants (spécialisation de lieux)
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    lieu_id INT REFERENCES lieux(id) ON DELETE CASCADE,
    prix_moyen NUMERIC,
    type_cuisine TEXT, -- ex: 'guinéenne', 'fast-food', etc.
    services TEXT[],   -- ex: ['sur place', 'à emporter', 'livraison']
    reservation_possible BOOLEAN DEFAULT FALSE,
    site_web TEXT,
    facebook TEXT,
    instagram TEXT,
    whatsapp TEXT
);

-- Table des menus (liés à un restaurant)
CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,
    nom TEXT NOT NULL,
    prix NUMERIC, -- optionnel
    description TEXT
);

-- Table des plats (liés à un menu OU à la carte)
CREATE TABLE plats (
    id SERIAL PRIMARY KEY,
    menu_id INT REFERENCES menus(id) ON DELETE CASCADE,
    restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,
    nom TEXT NOT NULL,
    prix NUMERIC NOT NULL,
    description TEXT,
    photo TEXT,
    categorie TEXT, -- entrée, plat, dessert, boisson, etc.
    options JSONB DEFAULT '[]' -- ex: [{ "nom": "Sauce", "choix": ["piquante", "arachide"] }]
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_restaurants_lieu_id ON restaurants(lieu_id);
CREATE INDEX idx_menus_restaurant_id ON menus(restaurant_id);
CREATE INDEX idx_plats_menu_id ON plats(menu_id);
CREATE INDEX idx_plats_restaurant_id ON plats(restaurant_id);
