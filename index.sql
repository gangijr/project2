DROP TABLE IF EXISTS players;

CREATE TABLE players(
    player_ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    fullName TEXT NOT NULL,
    screenName TEXT NOT NULL,
    ranking INTEGER NULL,
    wins INTEGER NOT NULL,
    losses INTEGER NOT NULL,
    isDeleted BINARY NOT NULL
);