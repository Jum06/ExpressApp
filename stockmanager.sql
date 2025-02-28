DROP DATABASE IF EXISTS stockmanager;
CREATE DATABASE stockmanager;
USE stockmanager;

CREATE TABLE IF NOT EXISTS categories
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS products
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255)   NOT NULL,
    description TEXT,
    price       DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock       INT            NOT NULL CHECK (stock >= 0),
    demand      INT            NOT NULL CHECK (demand >= 0),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS users
(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email    VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS roles
(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS permissions
(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS role_permissions
(
    role_id       INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_roles
(
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inventory_changes
(
    id            INT AUTO_INCREMENT PRIMARY KEY,
    product_id    INT                                                NOT NULL,
    user_id       INT                                                NOT NULL,
    type          ENUM ('stock', 'demand')                           NOT NULL,
    change_amount INT                                                NOT NULL CHECK (change_amount != 0),
    change_type   ENUM ('purchase', 'restock', 'sale', 'correction') NOT NULL,
    timestamp     DATETIME DEFAULT CURRENT_TIMESTAMP,
    reason        TEXT,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX idx_product_id ON inventory_changes (product_id);
CREATE INDEX idx_user_id ON inventory_changes (user_id);

INSERT INTO roles (name)
VALUES ('Admin'),
       ('Lagerist'),
       ('Viewer')
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO permissions (name)
VALUES ('VIEW_PRODUCTS'),
       ('MANAGE_STOCK'),
       ('MANAGE_DEMAND')
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO role_permissions (role_id, permission_id)
VALUES ((SELECT id FROM roles WHERE name = 'Admin'), (SELECT id FROM permissions WHERE name = 'VIEW_PRODUCTS')),
       ((SELECT id FROM roles WHERE name = 'Admin'), (SELECT id FROM permissions WHERE name = 'MANAGE_STOCK')),
       ((SELECT id FROM roles WHERE name = 'Admin'), (SELECT id FROM permissions WHERE name = 'MANAGE_DEMAND')),
       ((SELECT id FROM roles WHERE name = 'Lagerist'), (SELECT id FROM permissions WHERE name = 'VIEW_PRODUCTS')),
       ((SELECT id FROM roles WHERE name = 'Lagerist'), (SELECT id FROM permissions WHERE name = 'MANAGE_STOCK')),
       ((SELECT id FROM roles WHERE name = 'Viewer'), (SELECT id FROM permissions WHERE name = 'VIEW_PRODUCTS'))
ON DUPLICATE KEY UPDATE role_id=role_id,
                        permission_id=permission_id;

INSERT INTO users (username, email)
VALUES ('admin', 'admin@example.com'),
       ('lagerist1', 'lagerist1@example.com'),
       ('viewer1', 'viewer1@example.com')
ON DUPLICATE KEY UPDATE username=username;

INSERT INTO user_roles (user_id, role_id)
VALUES ((SELECT id FROM users WHERE username = 'admin'), (SELECT id FROM roles WHERE name = 'Admin')),
       ((SELECT id FROM users WHERE username = 'lagerist1'), (SELECT id FROM roles WHERE name = 'Lagerist')),
       ((SELECT id FROM users WHERE username = 'viewer1'), (SELECT id FROM roles WHERE name = 'Viewer'))
ON DUPLICATE KEY UPDATE user_id=user_id,
                        role_id=role_id;

INSERT INTO categories (name, description)
VALUES ('Storage', 'Produkte zur Lagerung oder Aufbewahrung'),
       ('Zubehör', 'Ergänzende Artikel für die Hauptprodukte')
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO products (name, description, price, stock, demand, category_id)
VALUES ('Lagerbox', 'Robuste Holzbox zur Lagerung', 59.99, 15, 5, (SELECT id FROM categories WHERE name = 'Storage')),
       ('Geigenhalter', 'Halterung für Streichinstrumente', 29.99, 30, 10,
        (SELECT id FROM categories WHERE name = 'Zubehör'))
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO inventory_changes (product_id, user_id, type, change_amount, change_type, reason)
VALUES ((SELECT id FROM products WHERE name = 'Lagerbox'), (SELECT id FROM users WHERE username = 'admin'), 'stock', -1,
        'sale', 'Verkauf an Kunde'),
       ((SELECT id FROM products WHERE name = 'Geigenhalter'), (SELECT id FROM users WHERE username = 'lagerist1'),
        'stock', 5, 'restock', 'Neue Lieferung erhalten');