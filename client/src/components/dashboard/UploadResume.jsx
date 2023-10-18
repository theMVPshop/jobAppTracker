import React, { useRef, useState } from "react";
import ky from "ky";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonFilled from "../../reusable/ButtonFilled";
import ButtonEmpty from "../../reusable/ButtonEmpty";
import { Icon } from "@blueprintjs/core";
import styled from "styled-components";

function UploadResume() {
  const { user, isAuthenticated } = useAuth0();
  const [file, setFile] = useState(null);
  const [jobInfo, setjobInfo] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [gptRating, setGptRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const cancel = () => {
    setFile(null);
  };

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    if (!isAuthenticated) {
      alert("Please log in first.");
      return;
    }
    if (!user.sub) {
      alert("Error getting user ID.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("pdfFile", file);
    formData.append("user_id", user.sub);
    formData.append("resume_id", 1);

    console.log("Uploading...");

    try {
      const resumeText = await ky
        .post("http://localhost:3000/api/resume/upload", { body: formData })
        .text();
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

  return (
    <>
      {isLoading ? (
        <>
          <progress /> <p>Loading...</p>
        </>
      ) : null}
      <p>{gptRating}</p>
      <div>
        {!file && (
          <ButtonFilled content="Upload Resume" handleClick={handleClick} />
        )}
        <input
          type="file"
          accept=".pdf"
          onChange={onFileChange}
          ref={hiddenFileInput}
          style={{ display: "none" }}
        />
        {file && (
          <SelectedWrapper>
            <ButtonFilled handleClick={uploadResume} content="Submit" />
            <div onClick={cancel}>
              <StyledIcon icon="cross" size={30} />
              <p>{file.name}</p>
            </div>
          </SelectedWrapper>
        )}
        <br />
        <br />
      </div>
    </>
  );
}

export default UploadResume;

const FileSelect = styled.input`
  display: flex;
  flex-direction: column;
  color: blue;
  background-color: blue;
`;

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.primaryBlue};
  display: flex;
  align-items: center;
`;

const SelectedWrapper = styled.div`
  div {
    display: flex;
    gap: 5px;
    min-width: 0;
    cursor: pointer;
    &:hover {
      :first-child {
        fill: red;
      }
    }
    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;
