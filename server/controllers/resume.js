import { readPdfText } from "pdf-text-reader"
const pool = require('../mysql/connection')

export const processResume = async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }

    const fileBuffer = req.file.buffer;
    const fileUint8Array = new Uint8Array(fileBuffer);

    const pdfText = await readPdfText({ data: fileUint8Array });

    const user_id = req.params.user_id;

    //Conditional statement that (should) determine whether the upload button will create a new resume entry for a user
    //or if it will update a currently existing resume.
    if (req.params.resume_id) {
        const values = [
            req.params.resume_text
        ]
        const resume_id = req.params.resume_id
        const sql = "UPDATE resume SET resume_text = ? WHERE user_id = ? AND resume_id = ?"
        pool.query(sql, [...values,user_id,resume_id], (err,data) => {
            if(err) return res.json(err)
            return pdfText ? res.status(200).send(pdfText) : res.status(500).send("Error processing resume");
        })
    } else {
        const values = [
            req.params.resume_text,
            req.params.resume_id
        ]
        const sql = "INSERT INTO resume (`resume_text`, `resume_id`) VALUES(?)"
        pool.query(sql,[values], (err,data)=> {
            if(err) return res.json(err)
            return pdfText ? res.status(200).send(pdfText) : res.status(500).send("Error processing resume");
        })
    }
    // If this doesn't work just comment my code and uncomment the next line and it should work like before
    // return pdfText ? res.status(200).send(pdfText) : res.status(500).send("Error processing resume");
}
