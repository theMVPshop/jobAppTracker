import pool from '../mysql/connection.js';

export const createApplication = async (req, res) => {
    const checkUserSql = "SELECT id FROM users WHERE id = ?";
    const createUserSql = "INSERT INTO users (id, email, password) VALUES (?, ?, ?)";
    const userEmail = "test@test.com"
    const userPassword = "TestTest0"

    const con = await pool.getConnection();
    try {
        const userId = req.params.user_id;
        let [userRows] = await con.execute(con.format(checkUserSql, [userId]));
        if (userRows.length === 0) {
            await con.execute(con.format(createUserSql, [userId, userEmail, userPassword]));
        }

        const createApplicationSql = "INSERT INTO applications (user_id, gpt_rating, gpt_analysis, status, description, date_applied, company_name, position_title, location, skills, experience, salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const values = [
            userId,
            parseInt(req.body.gpt_rating),
            req.body.gpt_analysis.substring(0, 1000),
            req.body.status.substring(0, 20),
            req.body.description.substring(0, 65,535),
            new Date(req.body.date_applied).toISOString().slice(0, 19).replace('T', ' '),
            req.body.company_name.substring(0, 100),
            req.body.position_title.substring(0, 100),
            req.body.location.substring(0, 100),
            req.body.skills.substring(0, 1000),
            req.body.experience.substring(0, 1000),
            req.body.salary.substring(0, 30)
        ];

        const formattedSql = con.format(createApplicationSql, values);
        const [rows] = await con.execute(formattedSql);

        return res.status(200).json(rows);
    } catch (err) {
        console.error(err);

    } finally {
        con.release();
    } return res.status(500).send(err);
};


export const getUserApplications = async (req, res) => {
    const sql = "SELECT * FROM applications WHERE user_id = ?";
    const con = await pool.getConnection();
    try {
        const userId = req.params.user_id;
        const formattedSql = con.format(sql, [userId]);
        const [rows] = await con.execute(formattedSql);
        return res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    } finally {
        con.release();
    }
};

export const updateApplication = async (req, res) => {
    const sql = `
        UPDATE applications
        SET gpt_rating = ?, gpt_analysis = ?, status = ?, description = ?, date_applied = ?, company_name = ?, position_title = ?, location = ?, skills = ?, experience = ?, salary = ?
        WHERE id = ?
    `;
    const con = await pool.getConnection();
    try {
        
        const values = [
            parseInt(req.body.gpt_rating),
            req.body.gpt_analysis.substring(0, 1000),
            req.body.status.substring(0, 20),
            req.body.description.substring(0, 65,535),
            new Date(req.body.date_applied).toISOString().slice(0, 19).replace('T', ' '),
            req.body.company_name.substring(0, 100),
            req.body.position_title.substring(0, 100),
            req.body.location.substring(0, 100),
            req.body.skills.substring(0, 1000),
            req.body.experience.substring(0, 1000),
            req.body.salary.substring(0, 30),
            req.params.id
        ];
        const formattedSql = con.format(sql, values);
        const [rows] = await con.execute(formattedSql);
        return res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    } finally {
        con.release();
    }
};

export const deleteApplication = async (req, res) => {
    const sql = "DELETE FROM applications WHERE id = ?";

    const con = await pool.getConnection();
    try {
        const values = [req.params.id];
        const formattedSql = con.format(sql, values);
        const [rows] = await con.execute(formattedSql);
        return res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
    finally {
        con.release();
    }
};