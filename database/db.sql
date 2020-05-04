CREATE DATABASE test_react_node;

USE test_react_node;



CREATE TABLE roles(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(16)
);

CREATE TABLE users(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_role INT(11),
    first_name VARCHAR(16),
    last_name VARCHAR(16),
    email VARCHAR (16),
    password VARCHAR (60),
    created TEXT (16),
    FOREIGN KEY (id_role) REFERENCES roles(id)  ON DELETE CASCADE
);

CREATE TABLE ticket(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    requested_ticket INT,
    FOREIGN KEY (id_user) REFERENCES users(id)  ON DELETE CASCADE
    
);

/*roles*/
INSERT INTO roles (name) VALUES ('admin');
INSERT INTO roles (name) VALUES ('users');




