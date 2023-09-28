import { readPdfText } from "pdf-text-reader"

export const processResume = async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }

    const fileBuffer = req.file.buffer;
    const fileUint8Array = new Uint8Array(fileBuffer);

    const pdfText = await readPdfText({ data: fileUint8Array });

    return pdfText ? res.status(200).send(pdfText) : res.status(500).send("Error processing resume");
}