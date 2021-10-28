
-- Remove any existing database and user.
DROP DATABASE IF EXISTS scores;
DROP USER IF EXISTS players_user@localhost;

-- Create Unforget database and user. Ensure Unicode is fully supported.
CREATE DATABASE scores CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE USER players_user@localhost IDENTIFIED WITH mysql_native_password BY 'Gangigangi7'
GRANT ALL PRIVILEGES ON scores.* TO players_user@localhost;

