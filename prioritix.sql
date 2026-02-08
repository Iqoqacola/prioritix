DROP DATABASE prioritix;

CREATE DATABASE prioritix;
-- CREATE DATABASE IF NOT EXISTS prioritix;

USE prioritix;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM("free", "pro", "premium") DEFAULT "free",
    avatar_path VARCHAR(255) DEFAULT "/uploads/avatars/avatar-default.png", 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE project (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    color VARCHAR(8) NOT NULL DEFAULT "#000000",
    FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    project_id INT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status ENUM("pending", "in_progress", "completed") DEFAULT "pending",
    priority ENUM("low", "medium", "high") DEFAULT "medium",
    due_date DATE, 
    tags VARCHAR(255),
    starred BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ==========================================
-- SEEDING DATA
-- ==========================================

-- Insert User 
INSERT INTO user (full_name, email, password_hash, role) 
VALUES ('John Doe', 'tester@gmail.com', '$2b$10$EuJQpgFjMXKHhoNREtBEJuNpA7hmivker.aAFYqezXp7m2uZrp8Yy', 'free');

-- Insert Project 
INSERT INTO project (user_id, title, color) VALUES
(1, 'Website Revamp', '#3B82F6'),
(1, 'Mobile App', '#10B981'),
(1, 'Research Project', '#F59E0B');


-- Insert Task
INSERT INTO task 
(user_id, project_id, title, description, status, priority, due_date, tags, starred)
VALUES
(1, 1, 'Setup repo', 'Initialize git repository', 'completed', 'medium', '2026-02-01', 'setup,git', TRUE),

(1, 1, 'Design landing page', 'Create landing UI mockup', 'in_progress', 'high', '2026-02-10', 'design,ui', TRUE),

(1, 1, 'Implement navbar', 'Responsive navigation bar', 'pending', 'medium', '2026-02-12', 'frontend', FALSE),

(1, 2, 'Auth flow', 'Login & register screen', 'in_progress', 'high', '2026-02-09', 'auth,mobile', TRUE),

(1, 2, 'API integration', 'Connect to backend API', 'pending', 'high', '2026-02-15', 'api', FALSE),

(1, 2, 'Push notification', 'Setup FCM', 'pending', 'low', '2026-02-20', 'notification', FALSE),

(1, 3, 'Literature review', 'Collect research papers', 'completed', 'medium', '2026-01-30', 'research', FALSE),

(1, 3, 'Data cleaning', 'Prepare dataset', 'in_progress', 'high', '2026-02-08', 'data', TRUE),

(1, 3, 'Model testing', 'Run experiment v1', 'pending', 'medium', '2026-02-18', 'ml,test', FALSE),

(1, 3, 'Write report', 'Draft final report', 'pending', 'medium', '2026-02-25', 'report', FALSE);
