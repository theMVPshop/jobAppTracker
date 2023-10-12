import pool from '../mysql/connection.js';

const con = await pool.getConnection();

export const createApplication = async (req, res) => {
    const checkUserSql = "SELECT id FROM users WHERE id = ?";
    const createUserSql = "INSERT INTO users (id, email, password) VALUES (?, ?, ?)";
    const userId = req.params.user_id;
    const userEmail = "test@test.com"
    const userPassword = "TestTest0"

    try {
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

        console.log("Executing...");
        const formattedSql = con.format(createApplicationSql, applicationValues);
        const [rows] = await con.execute(formattedSql);
        console.log("Result:", rows);
        return res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};


export const getUserApplications = async (req, res) => {
    const sql = "SELECT * FROM applications WHERE user_id = ?";
    const userId = req.params.user_id;

    try {
        const [rows, fields] = await pool.execute(sql, [userId]);
        return res.json(rows);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const updateApplication = async (req, res) => {
    const sql = `
        UPDATE applications
        SET user_id = ?, gpt_rating = ?, status = ?, company_name = ?, position_title = ?, work_location = ?, requested_experience = ?, requested_education = ?
        WHERE application_id = ?
    `;

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

    try {
        const [rows, fields] = await pool.execute(sql, values);
        return res.json(rows);
    } catch (err) {
        return res.status(500).send(err);
    }
};


// // const updateApplication = (req, res) => {
// //     const sql = "UPDATE applications SET company_name = ?, position_title = ?, work_location = ?, requested_experience = ?, requested_education = ?  WHERE user_id = ? AND application_id =?"
// //     const user_id = req.params.user_id;
// //     const application_id = req.params.application_id

// //     const values = [
// //         req.body.company_name,
// //         req.body.position_title,
// //         req.body.work_location,
// //         req.body.requested_experience,
// //         req.body.requested_education
// //     ]
// //     pool.query(sql, [...values, user_id, application_id], (err, data) => {
// //         if (err) return res.json(err)
// //         return res.json(data)
// //     })
// // }

// const deleteApplication = (req, res) => {
//     const deleteSQL = "DELETE FROM applications WHERE application_id = ?;";
//     const alterSQL = "ALTER TABLE applications AUTO_INCREMENT = ?;";

//     let application_id = req.params.application_id;
//     application_id = parseInt(application_id, 10);


//     // First, execute the DELETE statement
//     pool.query(deleteSQL, [application_id], (deleteErr, deleteResult) => {
//         if (deleteErr) return res.json(deleteErr);

//         // Then, execute the ALTER TABLE statement
//         pool.query(alterSQL, [application_id], (alterErr, alterResult) => {
//             if (alterErr) return res.json(alterErr);

//             // Both queries have completed successfully
//             return res.json({ deleteResult, alterResult });
//         });
//     });
// };

// export default {
//     showApplications,
//     showApplication,
//     updateApplication,
//     deleteApplication,
// }

// const showApplications = (req, res) => {
//     const user_id = req.params.user_id;

//     const sql = "SELECT * FROM applications WHERE user_id = ?;";

//     pool.query(sql, user_id, (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data)
//     })
// };

// const showApplication = (req, res) => {
//     const user_id = req.params.user_id;
//     const application_id = req.params.application_id;

//     const sql = "SELECT * FROM applications WHERE user_id =? AND application_id =?";

//     pool.query(sql, [user_id, application_id], (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data)
//     })
// };