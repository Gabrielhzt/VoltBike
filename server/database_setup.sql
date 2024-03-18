-- Table pour stocker les utilisateurs de l'application
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  Username VARCHAR(50) NOT NULL,
  Email VARCHAR(100) UNIQUE,
  Password VARCHAR(100),
  GoogleUserID VARCHAR(100) UNIQUE,
  RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour stocker les produits disponibles à l'achat
CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR,
  description TEXT,
  price NUMERIC,
  quantity_available INTEGER
);

-- Table pour stocker les paniers des utilisateurs
CREATE TABLE IF NOT EXISTS carts (
  cart_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  total_amount NUMERIC,
  created_at TIMESTAMP,
  validate INTEGER
);

-- Table pour stocker les articles individuels ajoutés aux paniers
CREATE TABLE IF NOT EXISTS cart_items (
  cart_item_id SERIAL PRIMARY KEY,
  cart_id INTEGER REFERENCES carts(cart_id),
  product_id INTEGER REFERENCES products(product_id),
  quantity INTEGER
);

-- Table pour stocker les listes de souhaits des utilisateurs
CREATE TABLE IF NOT EXISTS wishlists (
  wishlist_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  product_id INTEGER REFERENCES products(product_id),
  UNIQUE(user_id, product_id)
);

-- Insertion des données pour les produits
INSERT INTO products (name, description, price, quantity_available)
VALUES 
    ('VoltBike Pulse', 'Lightweight and agile, the VoltBike Pulse is perfect for urban commutes. With its aluminum frame and powerful motor, it offers a smooth and secure ride, ideal for daily city journeys.', 1499, 50),
    ('VoltBike Boost', 'The VoltBike Boost is your ultimate off-road adventure companion. Sturdy and reliable, it takes you where the trails end, with its high-performance suspension and long-lasting battery.', 1999, 50),
    ('VoltBike Spark', 'Compact and convenient, the VoltBike Spark is designed to simplify your urban commutes. Foldable and easy to store, it provides an agile and eco-friendly ride to accompany you everywhere in the city.', 899, 50);
