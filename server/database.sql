-- Table users
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table orders
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    total NUMERIC(10, 2) NOT NULL,
    close BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table products
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    img VARCHAR(255),
    product_img VARCHAR(255),
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table orders_detail
CREATE TABLE orders_detail (
    order_detail_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS wishlists (
  wishlist_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  product_id INTEGER REFERENCES products(product_id),
  UNIQUE(user_id, product_id)
);


INSERT INTO products (name, description, img, product_img, price) 
VALUES
  ('VB Pulse', 'Lightweight and agile, the VoltBike Pulse is perfect for urban commutes. With its aluminum frame and powerful motor, it offers a smooth and secure ride, ideal for daily city journeys.', 'https://www.vanmoof.com/sites/default/files/2022-04/D_S5_Navigation.jpg', 'https://www.vanmoof.com/sites/default/files/2023-03/PDP-D-Carousel-S5-Light-01_0.jpg', 1499),
  ('VB Spark', 'Compact and convenient, the VoltBike Spark is designed to simplify your urban commutes. Foldable and easy to store, it provides an agile and eco-friendly ride to accompany you everywhere in the city.', 'https://www.vanmoof.com/sites/default/files/2022-04/desktop-panel-v.jpg', 'https://www.vanmoof.com/sites/default/files/2021-10/PDP-Gallery-1-Desktop.jpg', 1999),
  ('VB Boost', 'The VoltBike Boost is your ultimate off-road adventure companion. Sturdy and reliable, it takes you where the trails end, with its high-performance suspension and long-lasting battery.', 'https://www.vanmoof.com/sites/default/files/2022-04/D_A5_Navigation.jpg', 'https://www.vanmoof.com/sites/default/files/2023-03/PDP-D-Carousel-A5-Dark-01.jpg', 1199),
  ('VB Evo', 'Meet the VB Eco: Your urban mobility solution. Compact, foldable, and eco-friendly, the VoltBike Spark Eco simplifies city commutes without compromising style.', 'https://www.vanmoof.com/sites/default/files/2022-04/desktop-panel-v.jpg', 'https://www.vanmoof.com/sites/default/files/2021-10/PDP-Gallery-1-Desktop.jpg', 2499)