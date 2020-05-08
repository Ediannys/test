CREATE DATABASE test_react_node;

USE test_react_node;



CREATE TABLE roles(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(16),
    created TEXT (16)
);

CREATE TABLE users(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    role_id INT(11),
    first_name VARCHAR(16),
    last_name VARCHAR(16),
    email VARCHAR (16),
    password VARCHAR (60),
    created TEXT (16),
    FOREIGN KEY (role_id) REFERENCES roles(id)  ON DELETE CASCADE
);

CREATE TABLE tickets(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    issue VARCHAR(100),
    requested_ticket INT,
    created TEXT (16),
    FOREIGN KEY (user_id) REFERENCES users(id)  ON DELETE CASCADE
    
);

/*roles*/
INSERT INTO roles (name, created) VALUES ('admin', NOW());
INSERT INTO roles (name, created) VALUES ('users', NOW());

INSERT INTO users (role_id, first_name, last_name, email, password, created) 
VALUES (1,'Admin','Admin','admin@mail.com','$2b$10$C0Q4eIiYjB6T2.1a.2JUO.B4284tuFAQuVsjlUzqyxlU6OiQgvcqK',NOW());






