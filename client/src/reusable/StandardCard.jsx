import React, { useState } from "react";
import styled from "styled-components";
import ky from "ky";

const CardWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${(props) => !(props.isvisible === "true") && "display: none;"}
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1);
  width: 50%;
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
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleJobTitleChange = (e) => {
    e.stopPropagation();
    setJobTitle(e.target.value);
  };

  const handleJobUrlChange = (e) => {
    e.stopPropagation();
    setJobUrl(e.target.value);
  };

  const handleJobDescriptionChange = (e) => {
    e.stopPropagation();
    setJobDescription(e.target.value);
  };

  const getJobDescription = async () => {
    console.log(jobUrl)
    const desc = await ky.post("http://localhost:3000/api/scrape", { json: { url: jobUrl } }).text();
    setJobDescription(desc);
  }

  const handleCardSubmit = () => {
    const card = { title: jobTitle, description: jobDescription };
    onCardSubmit(card);
  };

  return (
    <CardWrapper isvisible={isvisible.toString()} onClick={(e) => e.stopPropagation()}>
      <InputWrapper>
        <InputLabel>Job Title:</InputLabel>
        <InputField
          type="text"
          value={jobTitle}
          onChange={handleJobTitleChange}
        />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Job URL:</InputLabel>
        <InputField
          type="text"
          value={jobUrl}
          onChange={handleJobUrlChange}
        />
      </InputWrapper>
      <button onClick={getJobDescription}>Find Job Description From LinkedIn, Indeed, or ZipRecruiter</button>
      <InputWrapper>
        <InputLabel>Job Description:</InputLabel>
        <textarea
          value={jobDescription}
          onChange={handleJobDescriptionChange}
        />
      </InputWrapper>
      <button onClick={handleCardSubmit}>Submit</button>
    </CardWrapper>
  );
};

export default StandardCard;
