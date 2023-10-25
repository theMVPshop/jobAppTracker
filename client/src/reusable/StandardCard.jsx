import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ky from "ky";
import { useAuth0 } from "@auth0/auth0-react";

const CardWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  height: auto;
  overflow:scroll;
  transform: translate(-50%, -50%);
  ${(props) => !(props.isvisible === "true") && "display: none;"}
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1);
  
  text-align: center;
  
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputLabel = styled.label`
  margin-bottom: 5px;
`;

const InputField = styled.input`
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const StandardCard = ({ isvisible, onCardSubmit }) => {
  const [jobTitle, setJobTitle] = useState("");
  const { user, isAuthenticated, loginWithPopup } = useAuth0();
  const [file, setFile] = useState(null);
  const [jobInfo, setjobInfo] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [gptRating, setGptRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categorizedData, setCategorizedData] = useState(null);

  const handleOpenAISubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/categorize",
        { jobInfo }
      );
      setCategorizedData(response.data);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleCardSubmit = async () => {
    console.log("data to backend");
    try {
      await axios.post(`http://localhost:3000/users/${user.sub}/applications`, {
        categorizedData,
      });
    } catch (error) {
      console.log(error);
    }
    console.log("data to backend done");
  };

  console.log("Me:", user.sub);
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onjobInfoChange = (e) => {
    setjobInfo(e.target.value);
    console.log("Frontend Job Info:", jobInfo);
  };

  const onJobUrlChange = (e) => {
    setJobUrl(e.target.value);
  };

  const fetchjobInfo = async () => {
    setIsLoading(true);
    try {
      const body = { url: jobUrl };
      const response = await ky.post("http://localhost:3000/api/scrape", {
        json: body,
      });
      if (response) {
        setjobInfo(await response.text());
      } else {
        console.error("Response is undefined");
      }
    } catch (error) {
      alert("Error: " + error);
    } finally {
      setIsLoading(false);
    }
  };

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
      loginWithPopup(getUser()).then((token) => {
        getUser().then((user) => {
          console.log(user);
        });
      });
    }

    if (!isAuthenticated) {
      await loginWithPopup()
        .then(() => {
          if (isAuthenticated) {
            uploadResume();
          }
        })
        .catch((error) => {
          alert("Error logging in");
        });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("pdfFile", file);

    console.log("Uploading...");

    try {
      await ky.post(
        `http://localhost:3000/api/resume/users/${user.sub}/upload`,
        { body: formData }
      );
      const resumeText = await ky(
        `http://localhost:3000/api/resume/users/${user.sub}`
      ).text();
      const rating = await ky
        .post("http://localhost:3000/api/resume/rate", {
          json: { resumeText, jobInfo },
        })
        .text();
      setGptRating(rating);
    } catch (error) {
      alert("Error: " + error);
    }

    setIsLoading(false);
  };

  const renderCategorizeScraper = () => {
    if (jobInfo.length == 0) {
      return null;
    }

    return (
      <form onSubmit={(e) => handleOpenAISubmit(e)}>
        
      <p> Successfully recieved job posting information. Our trained AI can now process it.</p>
      <button type="submit">Process Job</button>
      </form>
    )
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
            <strong>Company Name:</strong>{" "}
            {categorizedData["Company Name"] == ""
              ? "No relevant Company Name found"
              : categorizedData["Company Name"]}
          </li>
          <li>
            <strong>Position Title:</strong>{" "}
            {categorizedData["Position Title"] == ""
              ? "No relevant Position Title found"
              : categorizedData["Position Title"]}
          </li>
          <li>
            <strong>Work Location:</strong>{" "}
            {categorizedData["Work Location"] == ""
              ? "No relevant Work Location found"
              : categorizedData["Work Location"]}
          </li>
          <li>
            <strong>Job Type:</strong>{" "}
            {categorizedData["Job Type"] == ""
              ? "No relevant Job Type found"
              : categorizedData["Job Type"]}
          </li>
          <li>
            <strong>Salary:</strong>{" "}
            {categorizedData["Salary"] == ""
              ? "No relevant Compensation found"
              : categorizedData["Salary"]}
          </li>
          <li>
            <strong>Requested Qualifications:</strong>
            <ul>
              {categorizedData["Requested Qualifications"] == "" ||
              categorizedData["Requested Qualifications"].length === 0
                ? "No relevant Qualfications Found"
                : categorizedData["Requested Qualifications"].map(
                    (qualification, index) => (
                      <li key={index}>
                        {qualification.years
                          ? `${qualification.years} years of `
                          : ""}
                        {qualification.qualification}
                      </li>
                    )
                  )}
            </ul>
          </li>
          <li>
            <strong>Responsibilities:</strong>
            <ul>
              {categorizedData["Responsibilities"] == "" ||
              categorizedData["Responsibilities"].length === 0
                ? "No relevant Responsibilites found"
                : categorizedData["Responsibilities"].map(
                    (responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    )
                  )}
            </ul>
          </li>
          <li>
            <strong>Skills:</strong>
            <ul>
              {categorizedData["Skills"] == "" ||
              categorizedData["Skills"].length === 0
                ? "No relevant Skills found"
                : categorizedData["Skills"].map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
            </ul>
          </li>
          <li>
            <strong>Requested Education:</strong>{" "}
            {categorizedData["Requested Educations"] == ""
              ? "No relevant Educations found"
              : categorizedData["Requested Educations"]}
          </li>
        </ul>
        <button onClick={handleCardSubmit}>Submit Card</button>
      </div>
    );
  };

  return (
    <CardWrapper
      isvisible={isvisible.toString()}
      onClick={(e) => e.stopPropagation()}
    >
      <InputWrapper>
        <InputLabel>Job URL:</InputLabel>
        <InputField onChange={onJobUrlChange} type="text" name="job-url" />
        <button onClick={fetchjobInfo}>Generate Job Posting Description</button>
      </InputWrapper>
      {renderCategorizeScraper()}
      {renderCategorizedData()}
    </CardWrapper>
  );
};

export default StandardCard;
