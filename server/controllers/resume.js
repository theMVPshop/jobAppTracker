import { readPdfText } from "pdf-text-reader" 
import pool from "../mysql/connection.js";
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
        //Conditional statement that (should) determine whether the upload button will create a new resume entry for a user
        //or if it will update a currently existing resume.
        if (req.params.resume_id) {
            const sql = "UPDATE resume SET resume_text = ? WHERE resume_user_id = ? AND resume_id = ?";
            const values = [resumeText, req.params.resume_user_id, req.params.resume_id];
        
            query(sql, values, (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error processing the resume");
                }
                return res.status(200).send(resumeText);
            });
        } else {
            const sql = "INSERT INTO resume (`resume_text`, `resume_user_id`, `resume_id`) VALUES (?, ?,)";
            const values = [resumeText, req.params.resume_user_id, req.params.resume_id];
        
            query(sql, values, (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error processing the resume");
                }
                return res.status(200).send(resumeText);
            });
        }
        // If this doesn't work just comment my code and uncomment the next line and it should work like before
        // return return res.status(200).send(resumeText);
    } catch (error) {
        return res.status(500).send(error.message);
    }



    

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
