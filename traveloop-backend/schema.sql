CREATE DATABASE IF NOT EXISTS traveloop_db;
USE traveloop_db;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE trips (
    trip_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    trip_name VARCHAR(100),
    start_date DATE,
    end_date DATE,
    description TEXT,
    total_budget DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE cities (
    city_id INT AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(100),
    country VARCHAR(100),
    cost_index DECIMAL(5,2),
    popularity_score INT
);
CREATE TABLE stops (
    stop_id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT,
    city_id INT,
    arrival_date DATE,
    departure_date DATE,
    stop_order INT,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id),
    FOREIGN KEY (city_id) REFERENCES cities(city_id)
);
CREATE TABLE activities (
    activity_id INT AUTO_INCREMENT PRIMARY KEY,
    stop_id INT,
    activity_name VARCHAR(150),
    activity_type VARCHAR(50),
    activity_date DATE,
    activity_time TIME,
    cost DECIMAL(10,2),
    notes TEXT,
    FOREIGN KEY (stop_id) REFERENCES stops(stop_id)
);
CREATE TABLE expenses (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT,
    category VARCHAR(50),
    amount DECIMAL(10,2),
    description TEXT,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id)
);
CREATE TABLE shared_trips (
    share_id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT,
    share_token VARCHAR(255),
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id)
);
INSERT INTO users (full_name, email, password)
VALUES 
('Anshika Jaiswal', 'anshika@example.com', 'password123');

INSERT INTO trips (user_id, trip_name, start_date, end_date, description, total_budget)
VALUES 
(1, 'Goa Summer Trip', '2026-05-15', '2026-05-18', 'Relaxing beach trip with friends', 15000.00);

INSERT INTO cities (city_name, country, cost_index, popularity_score)
VALUES
('Panaji', 'India', 7.5, 90),
('Calangute', 'India', 8.0, 95);

INSERT INTO stops (trip_id, city_id, arrival_date, departure_date, stop_order)
VALUES
(1, 1, '2026-05-15', '2026-05-16', 1),
(1, 2, '2026-05-16', '2026-05-18', 2);

INSERT INTO activities (stop_id, activity_name, activity_type, activity_date, activity_time, cost, notes)
VALUES
(1, 'Visit Fontainhas', 'Sightseeing', '2026-05-15', '10:00:00', 500.00, 'Explore Portuguese streets'),
(2, 'Beach Walk', 'Leisure', '2026-05-16', '17:00:00', 0.00, 'Evening walk');

INSERT INTO expenses (trip_id, category, amount, description)
VALUES
(1, 'Transport', 4000.00, 'Train and taxi'),
(1, 'Stay', 6000.00, 'Hotel booking');

INSERT INTO shared_trips (trip_id, share_token, is_public)
VALUES
(1, 'goa-demo-trip', TRUE);

SELECT * FROM users;
SELECT * FROM trips;
SELECT * FROM cities;
SELECT * FROM stops;
SELECT * FROM activities;
SELECT * FROM expenses;
SELECT * FROM shared_trips;