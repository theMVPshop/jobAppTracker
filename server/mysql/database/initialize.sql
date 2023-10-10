CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) UNIQUE KEY,
    password VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE applications (
	application_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date_applied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    company_name VARCHAR(100),
    position_title VARCHAR(100),
    work_location VARCHAR(100),
    skills JSON,
    requested_experience JSON,
    requested_education VARCHAR(1000),
    FOREIGN KEY(user_id) references users(id)
);

CREATE TABLE resume (
    resume_text LONGTEXT,
    resume_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    resume_user_id INT NOT NULL DEFAULT 1, 
    -- testing default value, will be removed once the users table is 
    -- populated when a user creates a new account or signs in for the first time
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- FOREIGN KEY (resume_user_id) REFERENCES users(id)
);