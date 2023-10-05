import { readPdfText } from "pdf-text-reader"
const pool = require('../mysql/connection')
import { openai } from "../../server.js";

export const processResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }

        const fileBuffer = req.file.buffer;
        const fileUint8Array = new Uint8Array(fileBuffer);
        const resumeText = await readPdfText({ data: fileUint8Array });

        const message = await rateResume(resumeText);

        if (req.params.resume_id) {
            const values = [
                req.params.resume_text
            ]

            const user_id = req.params.user_id;
            const resume_id = req.params.resume_id
            const sql = "UPDATE resume SET resume_text = ? WHERE user_id = ? AND resume_id = ?"

            pool.query(sql, [...values, user_id, resume_id], (err, data) => {
                if (err) return res.json(err)
                return res.status(200).send(message);
            })
        } else {
            const values = [
                req.params.resume_text,
                req.params.resume_id
            ]
            const sql = "INSERT INTO resume (`resume_text`, `resume_id`) VALUES(?)"
            pool.query(sql, [values], (err, data) => {
                if (err) return res.json(err)
                return res.status(200).send(message);
            })
        }
        // If this doesn't work just comment my code and uncomment the next line and it should work like before
        // return return res.status(200).send(message);
    } catch (error) {
        return res.status(500).send(error.message);
    }



    //Conditional statement that (should) determine whether the upload button will create a new resume entry for a user
    //or if it will update a currently existing resume.

}

export const rateResume = async (req, res) => {
    try {
        const { jobInfo, resumeText } = req.body;

        const chat = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{
                role: 'user', content: `Here is my resume: ${resumeText}
        And here is the job description: ${jobInfo}
        Please give me a rating of 0-100% of how well my resume matches this job, and why. Be concise.` }],
        });

        const message = chat.choices[0].message.content;

        return res.status(200).send(message);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
