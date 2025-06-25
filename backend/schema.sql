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
    images text[]
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
    contenu_html TEXT,
    meta_description TEXT,
    slug TEXT UNIQUE,
    image_principale TEXT,
    brouillon BOOLEAN DEFAULT TRUE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des images des articles
CREATE TABLE article_images (
    id SERIAL PRIMARY KEY,
    article_id INT REFERENCES articles(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text TEXT,
    position INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

-- Index pour améliorer les performances
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_article_images_article_id ON article_images(article_id); 