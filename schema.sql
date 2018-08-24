DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;

CREATE TABLE products(
    item_id MEDIUMINT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR (100) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INT (10) NOT NULL,
    primary key (item_id)
);

SHOW TABLES;
SELECT * FROM products;

DELETE FROM products WHERE item_id=1 LIMIT 1;
DELETE FROM products WHERE item_id BETWEEN 1 AND 100 LIMIT 100;
