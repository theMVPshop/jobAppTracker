import pool from '../mysql/connection.js';

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

export const createApplication = async (req, res) => {
    // const checkUserSql = "SELECT id FROM users WHERE id = ?";
    // const createUserSql = "INSERT INTO users (id) VALUES (?)";

    const con = await pool.getConnection();
    try {
        const userId = req.params.user_id;
        // let [userRows] = await con.execute(con.format(checkUserSql, [userId]));
        // if (userRows.length === 0) {
        //     await con.execute(con.format(createUserSql, [userId]));
        // }
        const categorizedData = req.body.categorizedData
        const createApplicationSql = "INSERT INTO applications (user_id, gpt_rating, gpt_analysis, status, company_name, position_title, work_location, job_type, salary, requested_qualifications, responsibilities, skills, requested_education) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        
        const values = [
            userId,
            parseInt(req.body.gpt_rating),
            req.body.gpt_analysis.substring(0, 1000),
            req.body.status.substring(0, 20),
            categorizedData['Company Name'], 
            categorizedData['Position Title'],
            categorizedData['Work Location'], 
            categorizedData['Job Type'],
            categorizedData['Salary'], 
            JSON.stringify(categorizedData['Requested Qualifications']),
            JSON.stringify(categorizedData['Responsibilities']), 
            JSON.stringify(categorizedData['Skills']),
            categorizedData['Requested Educations']
        ];

        const formattedSql = con.format(createApplicationSql, values);
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
        SET gpt_rating = ?, gpt_analysis = ?, status = ?, company_name = ? position_title = ?, work_location = ?, job_type = ?, salary = ?, requested_qualifications = ?, responsibilities = ?, skills = ?, requested_education = ?
        WHERE user_id = ? AND application_id =?`;
    const con = await pool.getConnection();
    try {
        const values = [
            parseInt(req.body.gpt_rating),
            req.body.gpt_analysis.substring(0, 1000),
            req.body.status.substring(0, 20),
            categorizedData['Company Name'], 
            categorizedData['Position Title'],
            categorizedData['Work Location'], 
            categorizedData['Job Type'],
            categorizedData['Salary'], 
            JSON.stringify(categorizedData['Requested Qualifications']),
            JSON.stringify(categorizedData['Responsibilities']), 
            JSON.stringify(categorizedData['Skills']),
            categorizedData['Requested Educations'],
            req.params.user_id,
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
    const sql = "DELETE FROM applications WHERE application_id = ?";

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