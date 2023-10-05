import React, { useState } from "react";
import ky from "ky";

function UploadFile() {
    const [file, setFile] = useState(null);
    const [jobInfo, setjobInfo] = useState("");
    const [jobUrl, setJobUrl] = useState("");
    const [gptRating, setGptRating] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onjobInfoChange = (e) => {
        setjobInfo(e.target.value);
    }

    const onJobUrlChange = (e) => {
        setJobUrl(e.target.value);
    }

    const fetchjobInfo = async () => {
        const body = { url: jobUrl };
        const response = await ky.post("http://localhost:3000/api/scrape", { json: body });
        setjobInfo(await response.text());
    }

    const uploadResume = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }
        if (!jobInfo) {
            alert("Please enter a job description.");
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("pdfFile", file);

        console.log("Uploading...")

        try {
            const resumeText = await ky.post("http://localhost:3000/api/resume/upload", { body: formData }).text();
            const rating = await ky.post("http://localhost:3000/api/resume/rate", { json: { resumeText, jobInfo } }).text();
            setGptRating(rating);
            
        } catch (error) {
            alert("Error: " + error);
        }

        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? <><progress /> <p>Loading...</p></> : null}
            <div>
                <input type="file" accept=".pdf" onChange={onFileChange} />
                <button onClick={uploadResume}>Upload Resume</button> <br />
                <label htmlFor="job-url">Job Posting URL</label> <br />
                <input onChange={onJobUrlChange} type="text" name="job-url" /> <br />
                <button onClick={fetchjobInfo}>Find Job Description from URL</button> <br />
                <label htmlFor="job-description">Enter Job Description Manually</label> <br />
                <textarea
                    onChange={onjobInfoChange}
                    name="job-description"
                    id="job-description"
                    cols="30"
                    rows="10"
                    value={jobInfo}
                />
            </div>
            <p>{gptRating}</p>
        </>
    );
}

export default UploadFile;