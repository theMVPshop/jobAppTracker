import React, { useState } from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${(props) => !props.isVisible && "display: none;"}
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

const StandardCard = ({ isVisible, onCardSubmit }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobUrl, setJobDescription] = useState("");

  const handleJobTitleChange = (e) => {
    e.stopPropagation();
    setJobTitle(e.target.value);
  };

  const handleJobDescriptionChange = (e) => {
    e.stopPropagation();
    setJobDescription(e.target.value);
  };

  const handleCardSubmit = () => {
    const card = { title: jobTitle, description: jobUrl };
    onCardSubmit(card);
  };

  return (
    <CardWrapper isVisible={isVisible} onClick={(e) => e.stopPropagation()}>
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
          onChange={handleJobDescriptionChange}
        />
      </InputWrapper>
      <button onClick={handleCardSubmit}>Submit</button>
    </CardWrapper>
  );
};

export default StandardCard;
