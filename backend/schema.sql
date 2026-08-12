CREATE DATABASE IF NOT EXISTS aletheia_db;
USE aletheia_db;

CREATE TABLE IF NOT EXISTS stakeholders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    access_level ENUM('FULL', 'READ', 'BOARD') DEFAULT 'READ',
    avatar VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS evaluations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ledger_id VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    objective TEXT NOT NULL,
    context TEXT,
    constraints TEXT,
    options JSON,
    confidence_score INT,
    results_json JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert mock data
INSERT INTO stakeholders (name, role, department, email, access_level, avatar) VALUES
('Sarah Chen', 'CFO', 'Finance', 'sarah.chen@company.com', 'FULL', 'SC'),
('Marcus Reed', 'CTO', 'Technology', 'marcus.reed@company.com', 'FULL', 'MR'),
('Dr. Priya Nair', 'Chief Ethics', 'Governance', 'p.nair@company.com', 'READ', 'PN'),
('Jackson Wells', 'Legal Counsel', 'Legal', 'j.wells@company.com', 'READ', 'JW'),
('Aiko Tanaka', 'Board Member', 'Board', 'a.tanaka@board.com', 'BOARD', 'AT');
