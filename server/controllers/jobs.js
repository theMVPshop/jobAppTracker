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

        const createApplicationSql = "INSERT INTO applications (user_id, gpt_rating, status, company_name, position_title, work_location, requested_experience, requested_education) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const applicationValues = [
            userId,
            req.body.gpt_rating,
            req.body.status,
            req.body.company_name,
            req.body.position_title,
            req.body.work_location,
            req.body.requested_experience,
            req.body.requested_education
        ];

        const formattedSql = con.format(createApplicationSql, applicationValues);
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
        SET user_id = ?, gpt_rating = ?, status = ?, company_name = ?, position_title = ?, work_location = ?, requested_experience = ?, requested_education = ?
        WHERE application_id = ?
    `;
    const con = await pool.getConnection();
    try {

        const values = [
            req.params.user_id,
            req.body.gpt_rating,
            req.body.status,
            req.body.company_name,
            req.body.position_title,
            req.body.work_location,
            req.body.requested_experience,
            req.body.requested_education,
            req.params.application_id
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
    const sql = "DELETE FROM applications WHERE application_id = ?";

    const con = await pool.getConnection();
    try {
        const values = [req.params.application_id];
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