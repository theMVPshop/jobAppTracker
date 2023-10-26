import pool from '../mysql/connection.js';

function jsDateToSQLDateTime(jsDate) {
    if (!jsDate) {
        return null;
    }
    const sqlDateTime = new Date(jsDate).toISOString().slice(0, 19).replace('T', ' ');
    return sqlDateTime;
}

export const getUserApplications = async (req, res) => {
    const sql = "SELECT * FROM applications WHERE user_id = ?";
    const con = await pool.getConnection();
    try {
        const user_id = req.params.user_id;
        const formattedSql = con.format(sql, user_id);
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

    console.log(req.body)

    const con = await pool.getConnection();
    try {
        const createApplicationSql = `
            INSERT INTO applications (
                user_id,
                gpt_rating,
                gpt_analysis,
                description,
                status,
                date_applied,
                company_name,
                position_title,
                location,
                job_type,
                salary,
                qualifications,
                responsibilities,
                skills,
                education
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            req.params.user_id,  // Required
            parseInt(req.body.gpt_rating) || null,
            req.body.gpt_analysis || null,
            req.body.description || null,
            req.body.status?.substring(0, 20) || null,
            jsDateToSQLDateTime(req.body.date_applied) || null,
            req.body.company_name?.substring(0, 100) || null,
            req.body.position_title?.substring(0, 100) || null,
            req.body.location?.substring(0, 100) || null,
            req.body.job_type?.substring(0, 100) || null,
            req.body.salary?.substring(0, 100) || null,
            req.body.qualifications || null,
            req.body.responsibilities || null,
            req.body.skills?.substring(0, 1000) || null,
            req.body.education?.substring(0, 100) || null
        ];

        const formattedSql = con.format(createApplicationSql, values);
        const [rows] = await con.execute(formattedSql);
        // Access the insertId property on the result object
        const applicationId = rows.insertId;

        return res.status(200).json({ applicationId });
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    } finally {
        con.release();
    }
};


export const updateApplication = async (req, res) => {
    const fields = [
        'gpt_rating',
        'gpt_analysis',
        'description',
        'status',
        'date_applied',
        'company_name',
        'position_title',
        'location',
        'job_type',
        'salary',
        'qualifications',
        'responsibilities',
        'skills',
        'education'
    ];

    const setClauses = fields.map(field => `${field} = ?`);
    const values = fields.map(field => {
        let value = req.body[field];
        if (field === 'date_applied' && value != null) {
            value = jsDateToSQLDateTime(value);
        }
        return value != null ? value : null;  // If value is null or undefined, replace with null
    });

    const sql = `UPDATE applications SET ${setClauses.join(', ')} WHERE user_id = ? AND id = ?`;
    values.push(req.params.user_id, parseInt(req.params.id, 10));  // Parse id to int

    const con = await pool.getConnection();
    try {
        const formattedSql = con.format(sql, values);
        const [rows] = await con.execute(formattedSql);

        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: 'Application not found or unauthorized' });
        }

        // After updating, fetch the updated job data
        const [updatedJobData] = await con.execute(
            'SELECT * FROM applications WHERE user_id = ? AND id = ?',
            [req.params.user_id, parseInt(req.params.id, 10)]
        );

        console.log(updatedJobData);

        return res.status(200).json(updatedJobData[0]);  // Assumes the first record is the updated job data
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    } finally {
        con.release();
    }
};

export const deleteApplication = async (req, res) => {
    const sql = "DELETE FROM applications WHERE id = ? AND user_id = ?";

    const con = await pool.getConnection();
    try {
        const id = req.params.id;
        const user_id = req.params.user_id;
        const formattedSql = con.format(sql, [id, user_id]);
        const [rows] = await con.execute(formattedSql);

        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: 'Application not found or unauthorized' });
        }

        return res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    } finally {
        con.release();
    }
};