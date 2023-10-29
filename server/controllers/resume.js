import { readPdfText } from "pdf-text-reader"
import pool from "../mysql/connection.js";
import { openai } from "../../server.js";

export const uploadResume = async (req, res) => {

    const con = await pool.getConnection();
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        
        const fileBuffer = req.file.buffer;
        const fileUint8Array = new Uint8Array(fileBuffer);
        const resumeText = await readPdfText({ data: fileUint8Array });
    
        const userId = req.params.user_id;
        const fileName = req.params.file_name

        const query = `
            INSERT INTO resume (user_id,resume_file_name,resume_text)
            VALUES (?,?,?)
        `;

        await con.execute(query, [userId,fileName,resumeText]);

        res.status(200).send("Resume uploaded successfully.");

    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    } finally {
        con.release();
    }
};

export const getResume = async (req, res) => {
    console.log("Get Resume has been found");

    const con = await pool.getConnection();
    try {
        const userId = req.params.user_id;

        const [rows] = await con.execute(
            'SELECT resume_text FROM resume WHERE user_id = ?',
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).send('Resume not found');
        }

        const resumeText = rows[0].resume_text;
        console.log("The rows:", rows)
        return res.status(200).send(resumeText);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    } finally {
        con.release();
    }
};

export const getResumes = async (req, res) => {
    console.log("Get Resumes has been found");

    const con = await pool.getConnection();
    try {
        const userId = req.params.user_id;

        const [rows] = await con.execute(
            'SELECT * FROM resume WHERE user_id = ?',
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).send('Resume not found');
        }

        const resumeText = rows;
        return res.status(200).send(resumeText);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    } finally {
        con.release();
    }
};

export const rateResume = async (req, res) => {
    try {
        let { jobInfo, resumeText } = req.body;

        if (!jobInfo || !resumeText) {
            return res.status(400).send("Both resume and job info are required.");
        }

        const charLimit = 10000;

        resumeText = resumeText.substring(0, charLimit);
        jobInfo = jobInfo.substring(0, charLimit);

        const content = `Here is my resume:
        ${resumeText}
        And here is the job description:
        ${jobInfo}
        Please follow these instructions clearly: Give me a 1-5 star rating of how well my resume matches this job.
        Then follow that with a CONCISE explanation (1-2 sentence max) of why you gave that rating.
        Directly connect the resume with the job description, noting years of experience and skill requirements, etc.
        Be generous with your rating, 5 stars shouldn't be impossible but should indicate a near perfect match.
        But don't be afraid to give a 1 star rating if the resume is completely unqualified.
        Don't give a low rating just because you don't have enough information to give a high rating, but do mention in your explanation that you're lacking information if that's the case.
        Format it like this:
        <star_rating_number> stars. <explanation>
        For example:
        3 stars. Looks like you have the right skills for this job but lack the years of experience they're looking for.`;

        const chat = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{
                role: 'user',
                content
            }],
        });

        const message = chat.choices[0].message.content;

        return res.status(200).send(message);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message);
    }
};


export const updateResume = async (req,res) => {
    try {
    const con = await pool.getConnection();
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }
    const fileBuffer = req.file.buffer;
    const fileUint8Array = new Uint8Array(fileBuffer);
    const resumeText = await readPdfText({ data: fileUint8Array });
    const userId = req.params.user_id;
    
    const query = `
        UPDATE resume SET resume_text = ? WHERE user_id = ?;
    `;
    await con.execute(query, [resumeText, userId]);
        
    res.status(200).send("Resume uploaded successfully.");
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    } finally {
        con.release();
    }
};

export const deleteResume = async (req,res) => {
    const userId = req.params.user_id;

    const sql = `DELETE FROM resume WHERE resume_id > 0 AND user_id = ?;`

    pool.query(sql, [userId], (deleteErr, deleteResult) => {
        if (deleteErr) return res.json(deleteErr);
        res.json(deleteResult)


    })
}
