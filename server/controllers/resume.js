import { readPdfText } from "pdf-text-reader"
import { openai } from "../../server.js";

export const processResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }

        const fileBuffer = req.file.buffer;
        const fileUint8Array = new Uint8Array(fileBuffer);
        const resumeText = await readPdfText({ data: fileUint8Array });

        return res.status(200).send(resumeText);
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