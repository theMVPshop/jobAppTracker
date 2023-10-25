CREATE TABLE IF NOT EXISTS users (
	id NOT NULL PRIMARY KEY,
    
    password VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
	application_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    status VARCHAR(20),
    date_applied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    company_name VARCHAR(100),
    position_title VARCHAR(100),
    work_location VARCHAR(100),
    job_type VARCHAR(100),
    salary VARCHAR(100),
    qualifications JSON,
    responsibilities JSON,
    skills JSON,
    education VARCHAR(1000),
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