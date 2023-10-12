import mysql from 'mysql2/promise';

const host = process.env.HOST;
const dbUserName = process.env.DBUSERNAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const port = 3306;

console.log("[MySQL] Connecting...");

const pool = mysql.createPool({
    connectionLimit: 100,
    host: host,
    port: port,
    user: dbUserName,
    password: password,
    database: database,
    multipleStatements: true
});

const con = await pool.getConnection();


console.log(`[MySQL] Connection to ${database} established.`);

console.log("[MySQL] Initializing database...");

async function initializeDatabase() {

    // If you need to drop tables to start fresh, uncomment this code:

    // const dropTableStatements = [
    //     `DROP TABLE IF EXISTS applications;`,
    //     `DROP TABLE IF EXISTS users;`,
    //     `DROP TABLE IF EXISTS resume;`
    // ];
    // try {
    //     console.log('[MySQL] Deleting tables...');
    //     for (let statement of dropTableStatements) {
    //         await con.execute(statement);
    //     }
    //     console.log('[MySQL] Deleted tables.');
    // } catch (error) {
    //     console.error('[MySQL] Error deleting tables:', error);
    // }

    const createStatements = [
        `CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(30) NOT NULL PRIMARY KEY,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`,
        `CREATE TABLE IF NOT EXISTS applications (
            application_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(30) NOT NULL,
            gpt_rating INT,
            status VARCHAR(20),
            description TEXT,
            date_applied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            company_name VARCHAR(100),
            position_title VARCHAR(100),
            location VARCHAR(100),
            skills VARCHAR(1000),
            experience VARCHAR(1000),
            salary INT,
            FOREIGN KEY(user_id) references users(id)
        );`,
        `CREATE TABLE IF NOT EXISTS resume (
            resume_text TEXT,
            resume_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(30) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
    ];

    try {
        for (let statement of createStatements) {
            await con.execute(statement);
        }
        console.log('[MySQL] Database initialized successfully.');
    } catch (error) {
        console.error('[MySQL] Error initializing database:', error);
    }
}

initializeDatabase();

export default pool;