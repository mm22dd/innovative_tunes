CREATE DATABASE innovative_tunes;
USE  innovative_tunes;

CREATE TABLE high_scores (
    id integer PRIMARY KEY AUTO_INCREMENT,
    player_name VARCHAR(255) NOT NULL,
    score integer NOT NULL
);

INSERT INTO high_scores (player_name, score)
VALUES
('Andrew', 1),
('Miguel', 2),
('Jonathan', 3),
('Joseph', 4),
('Adam', 5);