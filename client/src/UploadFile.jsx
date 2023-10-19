import React, { useState } from "react";
import ky from "ky";
import { useAuth0 } from "@auth0/auth0-react";

function UploadFile() {
    const { user, isAuthenticated, loginWithPopup } = useAuth0();
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
        setIsLoading(true);
        try {
            const body = { url: jobUrl };
            const response = await ky.post("http://localhost:3000/api/scrape", { json: body });
            if (response) {
                setjobInfo(await response.text());
            } else {
                console.error('Response is undefined');
            }
        } catch (error) {
            alert("Error: " + error);
        } finally {
            setIsLoading(false);
        }
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
        // if (!isAuthenticated) {
        //     alert("Please log in first.");
        //     return;
        // }
        // if (!user.sub) {
        //     alert("Error getting user ID.");
        //     return;
        // }

        if (!isAuthenticated) {
            await loginWithPopup().then(() => {
                if (isAuthenticated) {
                    uploadResume();
                }
            }).catch((error) => {
                alert("Error logging in");
            });
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("pdfFile", file);

        console.log("Uploading...")

        try {
            await ky.post(`http://localhost:3000/api/resume/users/${"test"}/upload`, { body: formData });
            const resumeText = await ky(`http://localhost:3000/api/resume/users/${"test"}`).text();
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
            <p>{gptRating}</p>
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
        </>
    );
}

export default UploadFile;