import React, { useState } from "react";
import ky from "ky";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
// import { data } from "cheerio/lib/api/attributes";

function UploadFile() {
    const { user, isAuthenticated, loginWithPopup } = useAuth0();
    const [file, setFile] = useState(null);
    const [jobInfo, setjobInfo] = useState("");
    const [jobUrl, setJobUrl] = useState("");
    const [gptRating, setGptRating] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [categorizedData, setCategorizedData] = useState(null);

  console.log("Me:", user.sub)
    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onjobInfoChange = (e) => {
        setjobInfo(e.target.value);
        console.log("Frontend Job Info:", jobInfo)
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

    // const userId = fetch("http://localhost:3000/api/uuid/get")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     return data.user_id;
    //   })
    //   .catch((err) => {
    //     alert("Error: " + err);
    //   })

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
            loginWithPopup(getUser()).then(token => {
                getUser().then(user => {
                    console.log(user);
                });
            })
        }

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
            await ky.post(`http://localhost:3000/api/resume/users/${user.sub}/upload`, { body: formData });
            const resumeText = await ky(`http://localhost:3000/api/resume/users/${user.sub}`).text();
            const rating = await ky.post("http://localhost:3000/api/resume/rate", { json: { resumeText, jobInfo } }).text();
            setGptRating(rating);

        } catch (error) {
            alert("Error: " + error);
        }

        setIsLoading(false);
    };
    
    const handleOpenAISubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:3000/api/categorize", { jobInfo });
        setCategorizedData(response.data);
    } catch (error) {
        console.error('error:', error);
    }
};

const dataToServer = async () => {
  console.log("data to backend")
  try {
    await axios.post('http://localhost:3000/api/applications', {categorizedData})
  } catch (error) {
    console.log(error)
  }
  console.log("data to backend done")
}


    const renderCategorizedData = () => {
        if (!categorizedData) {
          return null;
        }
      
        return (
          <div>
            <h2>Categorized Data:</h2>
            <ul>
              <li>
                <strong>Company Name:</strong> {categorizedData['Company Name'] == "" ? "No relevant Company Name found" : categorizedData['Company Name']}
              </li>
              <li>
                <strong>Position Title:</strong> {categorizedData['Position Title'] == "" ? "No relevant Position Title found" : categorizedData['Position Title']}
              </li>
              <li>
                <strong>Work Location:</strong> {categorizedData['Work Location'] == "" ? "No relevant Work Location found" : categorizedData['Work Location']}
              </li>
              <li>
                <strong>Job Type:</strong> {categorizedData['Job Type'] == "" ? "No relevant Job Type found" : categorizedData['Job Type']}
              </li>
              <li>
                <strong>Salary:</strong> {categorizedData['Salary'] == "" ? "No relevant Compensation found" : categorizedData['Salary']}
              </li>
              <li>
                <strong>Requested Qualifications:</strong>
                <ul>
                  {categorizedData['Requested Qualifications'] == "" || categorizedData['Requested Qualifications'].length ===0 ? "No relevant Qualfications Found" : categorizedData['Requested Qualifications'].map((qualification, index) => (
                    <li key={index}>
                      {qualification.years ? `${qualification.years} years of ` : ''}
                      {qualification.qualification}
                    </li>
                  ))}
    
                </ul>
              </li>
              <li>
                <strong>Responsibilities:</strong>
                <ul>
                  {categorizedData['Responsibilities'] == "" || categorizedData['Responsibilities'].length===0 ? "No relevant Responsibilites found" : categorizedData['Responsibilities'].map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                  
                </ul>
              </li>
              <li>
                <strong>Skills:</strong>
                <ul>
                  {categorizedData['Skills'] == "" || categorizedData['Skills'].length===0 ? "No relevant Skills found" : categorizedData['Skills'].map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))} 
                  
                
                </ul>
              </li>
              <li>
                <strong>Requested Education:</strong> {categorizedData['Requested Educations'] == "" ? "No relevant Educations found" : categorizedData['Requested Educations'] }
              </li>
            </ul>
            <button onClick={dataToServer}>Save Job Posting</button>
          </div>
        );
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
                    <form onSubmit={(e) => handleOpenAISubmit(e)}>
                      <textarea
                        onChange={onjobInfoChange}
                        name="job-description"
                        id="job-description"
                        cols="30"
                        rows="10"
                        value={jobInfo}
                      />
                        <button type="submit">Categorize Job Description</button>
                    </form>
                    {renderCategorizedData()}
            </div>
        </>
    );
}

export default UploadFile;