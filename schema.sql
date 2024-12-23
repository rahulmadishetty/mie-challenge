# TODO: add mysql/mariadb table definitions


-- Drop tables if they already exist
DROP TABLE IF EXISTS session_players;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS game_sessions;
DROP TABLE IF EXISTS games;

-- Create games table
CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    max_players INT,
    min_players INT,
    average_duration INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create game_sessions table
CREATE TABLE game_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT NOT NULL,
    session_date DATE NOT NULL,
    players_count INT DEFAULT 0,
    duration INT,
    location VARCHAR(255),
    game_outcome VARCHAR(50),
    score INT,
    team_details TEXT,
    notes TEXT,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

-- Create players table
CREATE TABLE players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create session_players table
CREATE TABLE session_players (
    session_id INT NOT NULL,
    player_id INT NOT NULL,
    FOREIGN KEY (session_id) REFERENCES game_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    PRIMARY KEY (session_id, player_id)
);


# TODO: add sample data

-- Insert sample data into games table
INSERT INTO games (name, description, category, max_players, min_players, average_duration) VALUES
('Catan', 'A strategy game where players build settlements and roads.', 'Strategy', 4, 2, 90),
('Ticket to Ride', 'A railway-themed board game.', 'Family', 5, 2, 60),
('Pandemic', 'A cooperative game where players fight to stop a global outbreak.', 'Cooperative', 4, 2, 75);

-- Insert sample data into game_sessions table
INSERT INTO game_sessions (game_id, session_date, players_count, duration, location, game_outcome, score, notes) VALUES
(1, '2024-01-15', 4, 90, 'John’s House', 'Won', 120, 'Great fun, close match.'),
(2, '2024-01-20', 5, 120, 'Community Center', 'Lost', NULL, 'Intense game with lots of strategy.'),
(3, '2024-01-22', 3, 75, 'Jane’s Apartment', 'Won', 200, 'Almost lost to the outbreak!');

-- Insert sample data into players table
INSERT INTO players (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com'),
('Charlie', 'charlie@example.com'),
('David', 'david@example.com');

-- Insert sample data into session_players table
INSERT INTO session_players (session_id, player_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 4);
