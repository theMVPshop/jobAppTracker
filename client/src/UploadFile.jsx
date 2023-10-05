import React, { useState } from "react";
import ky from "ky";

function UploadFile() {
    const [file, setFile] = useState(null);
    const [jobDesc, setJobDesc] = useState("");
    const [jobUrl, setJobUrl] = useState("");
    const [pdfText, setPdfText] = useState("");

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onJobDescChange = (e) => {
        setJobDesc(e.target.value);
    }

    const onJobUrlChange = (e) => {
        setJobUrl(e.target.value);
    }

    const fetchJobDesc = async () => {
        const body = { url: jobUrl };
        const response = await ky.post("http://localhost:3000/api/scrape", { json: body });
        setJobDesc(await response.text());
    }

    const uploadResume = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }
        if (!jobDesc) {
            alert("Please enter a job description.");
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
                <button onClick={uploadResume}>Upload Resume</button> <br />
                <label htmlFor="job-url">Job Posting URL</label> <br />
                <input onChange={onJobUrlChange} type="text" name="job-url" /> <br />
                <button onClick={fetchJobDesc}>Find Job Description from URL</button> <br />
                <label htmlFor="job-description">Enter Job Description Manually</label> <br />
                <textarea
                    onChange={onJobDescChange}
                    name="job-description"
                    id="job-description"
                    cols="30"
                    rows="10"
                    value={jobDesc}
                />
            </div>
            <div id="pdfText">{pdfText}</div>
        </>
    );
}

export default UploadFile;