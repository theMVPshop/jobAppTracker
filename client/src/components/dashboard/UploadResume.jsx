import React, { useRef, useState, useEffect } from "react";
import ky from "ky";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonFilled from "../../reusable/ButtonFilled";
import ButtonEmpty from "../../reusable/ButtonEmpty";
import { Icon } from "@blueprintjs/core";
import styled from "styled-components";
import axios from 'axios'

function UploadResume() {
  const { user, isAuthenticated } = useAuth0();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("")
  const [jobInfo, setjobInfo] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [gptRating, setGptRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resumes,setResumes] = useState(null);

  if (!isAuthenticated) {
    loginWithPopup(getUser()).then(token => {
      getUser().then(user => {
        console.log(user);
      });
    })
  }

  useEffect(() => {
    const fetchResume = async () => {
    const resumeData = await axios.get(`http://localhost:3000/api/resume/users/${user.sub}/resumes`)
    setResumes(resumeData.data[0]);
    console.log(resumes)
    }
    fetchResume();
  }, [])
  console.log("The resumes:", resumes)



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

    const userId = fetch("http://localhost:3000/api/uuid/get")
      .then((res) => res.json())
      .then((data) => {
        return data.user_id;
      })
      .catch((err) => {
        alert("Error: " + err);
      })

    try {
      const resumeText = await ky
        .post(`http://localhost:3000/api/resume/users/${user.sub}/${file.name}`, {body: formData})
        .text();
        setResumes(resumeText)
        setFile(null)
      alert("Resume uploaded successfully!")
    } catch (error) {
      alert("Error: " + error);
    }

    setIsLoading(false);
  };

  const updateResume = async () => {
    try{
      const updatedResume = await axios.put(`http://localhost:3000/api/resume/users/${user.sub}/update`, {file})
    } catch(error) {

    }
  }

  return (
    <>
      {isLoading ? (
        <>
          <progress /> <p>Loading...</p>
        </>
      ) : null}
      <p>{gptRating}</p>
      <div>
        {!resumes && (
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
        {resumes && (
          <SelectedWrapper>
            <ButtonFilled content="Update Resume"/>
            <p>{resumes.resume_file_name}</p>
          <p>You have a resume</p>
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
