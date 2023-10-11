import React, { useState } from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  display: ${(props) => (props.isVisible ? "block" : "none")};
  padding: 10px;
  margin: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const StandardCard = ({ isVisible, setCardVisibility }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleCloseModal = () => {
    setInput("");
    setCardVisibility(false);
  };

  return (
    <CardWrapper isVisible={isVisible}>
      <InputWrapper>
        <InputLabel>Job Title:</InputLabel>
        <InputField type="text" value={input} onChange={handleInputChange} />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Job Description:</InputLabel>
        <InputField type="text" value={input} onChange={handleInputChange} />
      </InputWrapper>
      <button onClick={handleCloseModal}>Close</button>
    </CardWrapper>
  );
};

export default StandardCard;
