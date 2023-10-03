import { readPdfText } from "pdf-text-reader"
import { openai } from "../../server.js";
import { v4 as uuidv4 } from 'uuid';

const clients = {};

export const processResume = async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }

    const fileId = uuidv4();  // Generate a unique ID for this file
    const fileBuffer = req.file.buffer;
    const fileUint8Array = new Uint8Array(fileBuffer);
    const resumeText = await readPdfText({ data: fileUint8Array });

    // Start processing the resume in a separate asynchronous function,
    // and store the response object in the clients object so we can
    // send data to it later
    clients[fileId] = res;
    rateResume(resumeText, fileId);

    // Respond with the URL for the SSE connection
    return res.json({ url: `/api/resume/events/${fileId}` });
}

export const getEvent = (req, res) => {
    const { fileId } = req.params;

    if (!clients[fileId]) {
        return res.status(404).send('Not found');
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();  // flush the headers to establish a connection with the client
}

const rateResume = async (resumeText, fileId) => {
    const jobInfo = ``  // Job description goes here

    const stream = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: `Here is my resume: ${resumeText}
        And here is the job description: ${jobInfo}
        Please give me a rating of 0-100% of how well my resume matches this job, and why. Be concise.` }],
        stream: true,
    });

    for await (const part of stream) {
        const content = part.choices[0]?.delta?.content || '';
        const res = clients[fileId];
        res.write(`data: ${content}\n\n`);  // send data to the client
    }

    const res = clients[fileId];
    res.end();  // end the response when processResume is done
    delete clients[fileId];  // clean up the response object
};