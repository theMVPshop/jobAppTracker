import mysql from "mysql2/promise";

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
  multipleStatements: true,
});

const con = await pool.getConnection();

console.log(`[MySQL] Connection to ${database} established.`);

console.log("[MySQL] Initializing database...");

async function initializeDatabase() {
  // If you need to drop tables to start fresh, uncomment this code:

  // const dropTableStatements = [
  //     `DROP TABLE IF EXISTS jobs, applications, users, resume;`
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
            id VARCHAR(100) NOT NULL PRIMARY KEY,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
    `CREATE TABLE IF NOT EXISTS applications (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(100) NOT NULL,
            gpt_rating INT,
            gpt_analysis TEXT,
            description TEXT,
            status VARCHAR(20),
            date_applied DATETIME DEFAULT CURRENT_TIMESTAMP,
            company_name VARCHAR(1000),
            position_title VARCHAR(1000),
            location VARCHAR(1000),
            job_type VARCHAR(1000),
            salary VARCHAR(1000),
            qualifications TEXT,
            responsibilities TEXT,
            skills VARCHAR(1000),
            education VARCHAR(1000),
            FOREIGN KEY(user_id) references users(id)
        );`,
    `CREATE TABLE IF NOT EXISTS resume (
            resume_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(100),
            resume_file_name VARCHAR(50),
            resume_text TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) references users(id)
        );`,
  ];

  try {
    for (let statement of createStatements) {
      await con.execute(statement);
    }
    console.log("[MySQL] Database initialized successfully.");
  } catch (error) {
    console.error("[MySQL] Error initializing database:", error);
  }
}

initializeDatabase();

export default pool;
