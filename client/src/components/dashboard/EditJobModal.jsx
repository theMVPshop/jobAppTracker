import React, { useState, useEffect, forwardRef } from "react";
import "./modal.css";
import { toTitleCase } from "../../App";
import styled from "styled-components";
import { Icon } from "@blueprintjs/core";
import ButtonFilled from "../../reusable/ButtonFilled";

const EditJobModal = forwardRef(function (
  { isVisible, onClose, onSubmit, initialData },
  ref
) {
  const [jobData, setJobData] = useState(initialData || {});

  useEffect(() => {
    if (initialData) {
      setJobData(initialData); // Update jobData when initialData changes
    }
  }, [initialData]);

  const handleEditSubmit = () => {
    onSubmit(jobData);
  };

  return (
    <div ref={ref} className={`modal ${isVisible ? "visible" : ""}`}>
      <div className="modalcard">
        <RightWrapper>
          <StyledCross icon="cross" size={25} onClick={onClose} />
        </RightWrapper>
        {initialData
          ? Object.keys(initialData).map((key) =>
              !["id", "user_id", "gpt_rating", "gpt_analysis", "status"].includes(key) ? (
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
            )
          : null}
        <ButtonContainer>
          <ButtonFilled content="Submit" handleClick={handleEditSubmit} />
        </ButtonContainer>
      </div>
    </div>
  );
});

export default EditJobModal;

const RightWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
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
`;
