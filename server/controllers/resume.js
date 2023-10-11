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

        console.log(req.body);

        if (req.body.resume_id) {
            const sql = "UPDATE resume SET resume_text = ? WHERE user_id = ? AND resume_id = ?";
            const values = [resumeText, req.body.user_id, req.body.resume_id];

            console.log("Updating resume...");
            try {
                const [result] = await pool.execute(sql, values);
                console.log(result);
                return res.status(200).send(resumeText);
            } catch (err) {
                console.error(err);
                return res.status(500).send("Error processing the resume");
            }
        } else {
            const sql = "INSERT INTO resume (`resume_text`, `user_id`) VALUES (?, ?)";
            const values = [resumeText, 1]; /* The 1 is a test value, do not use in prod, 
                                            this will be changed to req.body.resume_id
                                            to associate the user_id in the resume table */

            console.log("Resume id not found, adding resume...");
            try {
                const [result] = await pool.execute(sql, values);
                console.log(result);
                return res.status(200).send(resumeText);
            } catch (err) {
                console.error(err);
                return res.status(500).send("Error processing the resume");
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

export const rateResume = async (req, res) => {
    try {
        const { jobInfo, resumeText } = req.body;

        if (!jobInfo || !resumeText) {
            return res.status(400).send("Both resume and job info are required.");
        }

        const charLimit = 10000;

        if (resumeText.length > charLimit) {
            resumeText = resumeText.substring(0, charLimit);
        }
        if (jobInfo.length > charLimit) {
            jobInfo = jobInfo.substring(0, charLimit);
        }

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
