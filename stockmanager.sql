-- Erstelle die Datenbank (falls nicht vorhanden)
CREATE DATABASE IF NOT EXISTS stockmanager;
USE stockmanager;

-- Tabelle für Produkte
CREATE TABLE products
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255)   NOT NULL,
    description TEXT,
    price       DECIMAL(10, 2) NOT NULL CHECK (price >= 0), -- Preis darf nicht negativ sein
    stock       INT            NOT NULL CHECK (stock >= 0), -- Lagerbestand darf nicht negativ sein
    demand      INT            NOT NULL CHECK (demand >= 0) -- Bedarf darf nicht negativ sein
);

-- Tabelle für Benutzer
CREATE TABLE users
(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email    VARCHAR(255) NOT NULL UNIQUE
);

-- Tabelle für Rollen
CREATE TABLE roles
(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Tabelle für Berechtigungen
CREATE TABLE permissions
(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Verknüpfung von Rollen mit Berechtigungen
CREATE TABLE role_permissions
(
    roleId       INT NOT NULL,
    permissionId INT NOT NULL,
    PRIMARY KEY (roleId, permissionId),
    FOREIGN KEY (roleId) REFERENCES roles (id) ON DELETE CASCADE,
    FOREIGN KEY (permissionId) REFERENCES permissions (id) ON DELETE CASCADE
);

-- Verknüpfung von Benutzern mit Rollen
CREATE TABLE user_roles
(
    userId INT NOT NULL,
    roleId INT NOT NULL,
    PRIMARY KEY (userId, roleId),
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (roleId) REFERENCES roles (id) ON DELETE CASCADE
);

-- Tabelle für Bestandsänderungen
CREATE TABLE inventory_changes
(
    id           INT AUTO_INCREMENT PRIMARY KEY,
    productId    INT                                                NOT NULL,
    userId       INT                                                NOT NULL,
    type         ENUM ('stock', 'demand')                           NOT NULL,                           -- Art der Änderung: Lagerbestand oder Bedarf
    changeAmount INT                                                NOT NULL CHECK (changeAmount != 0), -- Änderung darf nicht 0 sein
    changeType   ENUM ('purchase', 'restock', 'sale', 'correction') NOT NULL,                           -- Grund der Änderung
    timestamp    DATETIME DEFAULT CURRENT_TIMESTAMP,
    reason       TEXT,                                                                                  -- Optionaler Kommentar zur Änderung
    FOREIGN KEY (productId) REFERENCES products (id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
);

-- Indexe für Performance-Optimierung
CREATE INDEX idx_product_id ON inventory_changes (productId);
CREATE INDEX idx_user_id ON inventory_changes (userId);

-- Standardrollen einfügen
INSERT INTO roles (name)
VALUES ('Admin'),
       ('Lagerist'),
       ('Viewer');

-- Standardberechtigungen einfügen
INSERT INTO permissions (name)
VALUES ('VIEW_PRODUCTS'),
       ('MANAGE_STOCK'),
       ('MANAGE_DEMAND');

-- Rollen mit Berechtigungen verknüpfen
INSERT INTO role_permissions (roleId, permissionId)
VALUES ((SELECT id FROM roles WHERE name = 'Admin'), (SELECT id FROM permissions WHERE name = 'VIEW_PRODUCTS')),
       ((SELECT id FROM roles WHERE name = 'Admin'), (SELECT id FROM permissions WHERE name = 'MANAGE_STOCK')),
       ((SELECT id FROM roles WHERE name = 'Admin'), (SELECT id FROM permissions WHERE name = 'MANAGE_DEMAND')),
       ((SELECT id FROM roles WHERE name = 'Lagerist'), (SELECT id FROM permissions WHERE name = 'VIEW_PRODUCTS')),
       ((SELECT id FROM roles WHERE name = 'Lagerist'), (SELECT id FROM permissions WHERE name = 'MANAGE_STOCK')),
       ((SELECT id FROM roles WHERE name = 'Viewer'), (SELECT id FROM permissions WHERE name = 'VIEW_PRODUCTS'));

-- Testbenutzer einfügen
INSERT INTO users (username, email)
VALUES ('admin', 'admin@kurzbau.at'),
       ('lagerist1', 'lagerist1@kurzbau.at'),
       ('viewer1', 'viewer1@kurzbau.at');

-- Benutzer mit Rollen verknüpfen
INSERT INTO user_roles (userId, roleId)
VALUES ((SELECT id FROM users WHERE username = 'admin'), (SELECT id FROM roles WHERE name = 'Admin')),
       ((SELECT id FROM users WHERE username = 'lagerist1'), (SELECT id FROM roles WHERE name = 'Lagerist')),
       ((SELECT id FROM users WHERE username = 'viewer1'), (SELECT id FROM roles WHERE name = 'Viewer'));

-- Testprodukte einfügen
INSERT INTO products (name, description, price, stock, demand)
VALUES ('Holz', 'Massiver Eichentisch', 199.99, 10, 5),
       ('Stuhl', 'Bequemer Holzstuhl', 49.99, 20, 10),
       ('Regal', 'Bücherregal aus Buche', 89.99, 5, 2);

-- Test-Bestandsänderungen einfügen
INSERT INTO inventory_changes (productId, userId, type, changeAmount, changeType, reason)
VALUES ((SELECT id FROM products WHERE name = 'Holz'), (SELECT id FROM users WHERE username = 'admin'), 'stock', -1,
        'sale', 'Verkauf an Kunde'),
       ((SELECT id FROM products WHERE name = 'Stuhl'), (SELECT id FROM users WHERE username = 'lagerist1'), 'stock', 5,
        'restock', 'Neue Lieferung erhalten');
