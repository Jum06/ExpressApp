CREATE DATABASE IF NOT EXISTS stockmanager;
USE stockmanager;

CREATE TABLE products
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255)   NOT NULL,
    description TEXT,
    price       DECIMAL(10, 2) NOT NULL CHECK (price >= 0), -- Preis darf nicht negativ sein
    stock       INT            NOT NULL CHECK (stock >= 0), -- Lagerbestand darf nicht negativ sein
    demand      INT            NOT NULL CHECK (demand >= 0) -- Bedarf darf nicht negativ sein
);

CREATE TABLE users
(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email    VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE roles
(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE permissions
(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE role_permissions
(
    roleId       INT NOT NULL,
    permissionId INT NOT NULL,
    PRIMARY KEY (roleId, permissionId),
    FOREIGN KEY (roleId) REFERENCES roles (id) ON DELETE CASCADE,
    FOREIGN KEY (permissionId) REFERENCES permissions (id) ON DELETE CASCADE
);

CREATE TABLE user_roles
(
    userId INT NOT NULL,
    roleId INT NOT NULL,
    PRIMARY KEY (userId, roleId),
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (roleId) REFERENCES roles (id) ON DELETE CASCADE
);

CREATE TABLE inventory_changes
(
    id           INT AUTO_INCREMENT PRIMARY KEY,
    productId    INT                                                NOT NULL,
    userId       INT                                                NOT NULL,
    type         ENUM ('stock', 'demand')                           NOT NULL,
    changeAmount INT                                                NOT NULL CHECK (changeAmount != 0),
    changeType   ENUM ('purchase', 'restock', 'sale', 'correction') NOT NULL,
    timestamp    DATETIME DEFAULT CURRENT_TIMESTAMP,
    reason       TEXT,
    FOREIGN KEY (productId) REFERENCES products (id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX idx_product_id ON inventory_changes (productId);
CREATE INDEX idx_user_id ON inventory_changes (userId);


INSERT INTO roles (name)
VALUES ('Admin'),
       ('Lagerist'),
       ('Viewer');


INSERT INTO permissions (name)
VALUES ('VIEW_PRODUCTS'),
       ('MANAGE_STOCK'),
       ('MANAGE_DEMAND');


INSERT INTO role_permissions (roleId, permissionId)
VALUES ((SELECT id FROM roles WHERE name = 'Admin'), (SELECT id FROM permissions WHERE name = 'VIEW_PRODUCTS')),
       ((SELECT id FROM roles WHERE name = 'Admin'), (SELECT id FROM permissions WHERE name = 'MANAGE_STOCK')),
       ((SELECT id FROM roles WHERE name = 'Admin'), (SELECT id FROM permissions WHERE name = 'MANAGE_DEMAND')),
       ((SELECT id FROM roles WHERE name = 'Lagerist'), (SELECT id FROM permissions WHERE name = 'VIEW_PRODUCTS')),
       ((SELECT id FROM roles WHERE name = 'Lagerist'), (SELECT id FROM permissions WHERE name = 'MANAGE_STOCK')),
       ((SELECT id FROM roles WHERE name = 'Viewer'), (SELECT id FROM permissions WHERE name = 'VIEW_PRODUCTS'));


INSERT INTO users (username, email)
VALUES ('admin', 'admin@kurzbau.at'),
       ('lagerist1', 'lagerist1@kurzbau.at'),
       ('viewer1', 'viewer1@kurzbau.at');


INSERT INTO user_roles (userId, roleId)
VALUES ((SELECT id FROM users WHERE username = 'admin'), (SELECT id FROM roles WHERE name = 'Admin')),
       ((SELECT id FROM users WHERE username = 'lagerist1'), (SELECT id FROM roles WHERE name = 'Lagerist')),
       ((SELECT id FROM users WHERE username = 'viewer1'), (SELECT id FROM roles WHERE name = 'Viewer'));


INSERT INTO products (name, description, price, stock, demand)
VALUES ('Holz', 'das ist holz', 110, 10, 5),
       ('auchHolz', 'das ist auch holz', 50, 20, 10),
       ('keinHolz', 'das ist kein Holz', 2, 5, 2);


INSERT INTO inventory_changes (productId, userId, type, changeAmount, changeType, reason)
VALUES ((SELECT id FROM products WHERE name = 'Holz'), (SELECT id FROM users WHERE username = 'admin'), 'stock', -1,
        'sale', 'Verkauf an Kunde'),
       ((SELECT id FROM products WHERE name = 'auchHolz'), (SELECT id FROM users WHERE username = 'lagerist1'), 'stock', 5,
        'restock', 'Neue Lieferung erhalten');
