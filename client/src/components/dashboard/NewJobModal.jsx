import React, { useState, forwardRef } from "react";
import "./modal.css";
import { toTitleCase } from "../../App";
import ky from "ky";
import styled from "styled-components";
import { Icon } from "@blueprintjs/core";
import ButtonEmpty from "../../reusable/ButtonEmpty";
import ButtonFilled from "../../reusable/ButtonFilled";

const NewJobModal = forwardRef(function (
  { isVisible, onClose, onSubmit },
  ref
) {
  const [isLoading, setIsLoading] = useState(false);
  const [useManualInput, setUseManualInput] = useState(false);
  const [jobUrl, setJobUrl] = useState("");
  const [jobData, setJobData] = useState({
    id: "",
    position_title: "",
    company_name: "",
    date_applied: "",
    description: "",
    status: "",
    location: "",
    job_type: "",
    salary: "",
    qualifications: "",
    responsibilities: "",
    skills: "",
    education: "",
    gpt_rating: 0,
    gpt_analysis: "",
  });

  const handleUrlSubmit = async () => {
    setIsLoading(true);
    const jobInfo = await ky
      .post("http://localhost:3000/api/scrape", { json: { url: jobUrl } })
      .text();
    const categorizedData = await ky
      .post("http://localhost:3000/api/categorize", {
        json: { jobInfo },
        timeout: 300000,
      })
      .json();

    const fetchedData = {
      position_title: categorizedData.position_title || "",
      company_name: categorizedData.company_name || "",
      location: categorizedData.location || "",
      job_type: categorizedData.job_type || "",
      salary: categorizedData.salary || "",
      qualifications: categorizedData.qualifications || "",
      responsibilities: categorizedData.responsibilities || "",
      skills: categorizedData.skills || "",
      education: categorizedData.education || "",
      date_applied: new Date().toISOString().split("T")[0],
    };

    onSubmit(fetchedData);
    setJobData({
      id: "",
      gpt_rating: 0,
      gpt_analysis: "",
      description: "",
      status: "",
      date_applied: "",
      company_name: "",
      position_title: "",
      location: "",
      job_type: "",
      salary: "",
      qualifications: "",
      responsibilities: "",
      skills: "",
      education: "",
    });
    setIsLoading(false);
    setJobUrl("");
  };

  const handleManualSubmit = () => {
    onSubmit(jobData);
    setJobData({
      id: "",
      gpt_rating: 0,
      gpt_analysis: "",
      description: "",
      status: "",
      date_applied: "",
      company_name: "",
      position_title: "",
      location: "",
      job_type: "",
      salary: "",
      qualifications: "",
      responsibilities: "",
      skills: "",
      education: "",
    });
    setJobUrl("");
  };

  return (
    <div ref={ref} className={`modal ${isVisible ? "visible" : ""}`}>
      <div className="modalcard">
        <RightWrapper>
          <StyledCross icon="cross" size={25} onClick={onClose} />
        </RightWrapper>
        {useManualInput ? (
          <>
            {Object.keys(jobData).map((key) =>
              !["id", "gpt_rating", "gpt_analysis", "status"].includes(key) ? (
                <label key={key}>
                  {toTitleCase(key)}
                  <input
                    type={key === "date_applied" ? "date" : "text"}
                    placeholder={toTitleCase(key)}
                    value={jobData[key] || ""}
                    onChange={(e) =>
                      setJobData({ ...jobData, [key]: e.target.value })
                    }
                  />
                </label>
              ) : null
            )}
            <ButtonFilled content="Submit" handleClick={handleManualSubmit} />
          </>
        ) : (
          <>
            {/* URL input field */}
            <label>
              <h4>Find a job from a LinkedIn, Indeed, or ZipRecruiter URL</h4>
              <input
                type="text"
                placeholder="Job Posting URL"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
              />
            </label>
            {isLoading ? (
              <>
                <progress />{" "}
                <p>
                  Finding job information, this may take up to a minute or
                  longer...
                </p>
              </>
            ) : null}
            <ButtonContainer>
              <ButtonFilled
                content="Submit"
                disabled={isLoading}
                handleClick={handleUrlSubmit}
              />
            </ButtonContainer>
          </>
        )}
        <ButtonContainerBottom>
          <ButtonEmpty
            content={useManualInput ? "Use URL" : "Manual Input"}
            handleClick={() => setUseManualInput(!useManualInput)}
          />
        </ButtonContainerBottom>
      </div>
    </div>
  );
});

export default NewJobModal;

const RightWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const StyledCross = styled(Icon)`
  fill: ${(props) => props.theme.colors.secondaryBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 5px;
  margin: 5px 0;
  :hover {
    fill: red;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
`;

const ButtonContainerBottom = styled.div`
  margin-top: 16px;
`;
