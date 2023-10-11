import { createPool } from 'mysql2/promise';

const host = process.env.HOST;
const dbUserName = process.env.DBUSERNAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const port = 3306;

class Connection {
    constructor() {
        if(!this.pool) {
            console.log("creating connection...");
            this.pool = createPool({
                connectionLimit: 100,
                host: host,
                port: port,
                user: dbUserName,
                password: password,
                database: database,
                multipleStatements: true
            });
            return this.pool;
        }
        return this.pool;
    }
}

const instance = new Connection();

async function initializeDatabase() {
    const createStatements = [
        `CREATE TABLE users (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(50) UNIQUE KEY,
            password VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`,
        `CREATE TABLE applications (
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
        );`,
        `CREATE TABLE resume (
            resume_text LONGTEXT,
            resume_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(30) NOT NULL DEFAULT '1',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
    ];

    try {
        for (let statement of createStatements) {
            await instance.pool.execute(statement);
        }
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

initializeDatabase();

export default instance;