CREATE DATABASE IF NOT EXISTS applis_db;
USE applis_db;

CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    date_de_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    utilisateur_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    contenu TEXT NOT NULL,
    date_de_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE 
);
show tables;
desc utilisateurs;
select * from utilisateurs;