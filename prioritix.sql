CREATE DATABASE IF NOT EXISTS prioritix;

USE prioritix;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM("free", "pro", "admin") DEFAULT "free",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;


CREATE TABLE task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status ENUM("pending", "in_progress", "completed") DEFAULT "pending",
    priority ENUM("low", "medium", "high") DEFAULT "medium",
    due_date DATE, 
    tags VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO user (full_name, email, password_hash, role) VALUES
('admin', 'admin@example.com', '12345678', 'admin'),
('pro_user', 'pro_user@example.com', '12345678', 'pro'),
('free_user', 'free_user@example.com', '12345678', 'free');

INSERT INTO task (user_id, title, description, status, priority, due_date, tags) VALUES
(1, 'Setup Project', 'Initial project setup and configuration', 'completed', 'high', '2024-07-01', 'setup,project'),
(2, 'Design Database Schema', 'Create the database schema for the application', 'in_progress', 'high', '2024-07-05', 'database,design'),
(2, 'Implement Authentication', 'Develop user authentication module', 'pending', 'medium', '2024-07-10', 'authentication,security'),
(3, 'Write Documentation', 'Document the API endpoints and usage', 'pending', 'low', '2024-07-15', 'documentation,api');