CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(50),
    price INTEGER,
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Vaccuum", "Appliances", 100, 15),
("Head Phones", "Electronics", 150, 10),
("Bananas", "Food", 1, 10000),
("Bamazon Echoo", "Electronics", 45, 100),
("Natural Himalayan Salt Lamp", "Home Décor", 60, 400),
("Studio Monitor Speaker", "Electronics", 200, 45),
("Sofa", "Home Décor", 500, 18),
("Electric Guitar", "Instruments", 250, 38),
("Acoustic Guitar", "Instrumets", 150, 27),
("Leash", "Pet Supplies", 12, 600),
("Godzilla Figurine", "Toys", 85, 24);
