import React, { useState } from "react";
import ky from "ky";

function UploadFile() {
    const [file, setFile] = useState(null);
    const [pdfText, setPdfText] = useState("");

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("pdfFile", file);

        try {
            const response = await ky.post("http://localhost:3000/api/resume/upload", { body: formData });
            setPdfText(await response.text());
        } catch (error) {
            alert("Error uploading file: " + error);
        }
    };

    return (
        <>
            <div>

                <input type="file" accept=".pdf" onChange={onFileChange} />
                <button onClick={onUpload}>Upload</button>
            </div>
            <div id="pdfText">{pdfText}</div>
        </>
    );
}

export default UploadFile;