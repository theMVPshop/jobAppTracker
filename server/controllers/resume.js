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
        console.log(req.params);

        const query = `
            INSERT INTO resume (user_id, resume_text)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE resume_text = VALUES(resume_text)
        `;

        await con.execute(query, [userId, resumeText]);

        res.status(200).send("Resume uploaded successfully.");

    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    } finally {
        con.release();
    }
};

export const getResume = async (req, res) => {
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
        console.log(req.body);

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
        Format it like this:
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
        return res.status(500).send(error.message);
    }
};
