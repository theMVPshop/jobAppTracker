import React, { useState, forwardRef, useEffect } from "react";
import "./modal.css";
import EditJobModal from "./EditJobModal";
import { toTitleCase } from "../../App";
import styled from "styled-components";
import { Icon } from "@blueprintjs/core";
import ButtonEmpty from "../../reusable/ButtonEmpty";
import ButtonFilled from "../../reusable/ButtonFilled";
import { columnsData } from "../../App";

const JobInfoModal = forwardRef(function (
  { data, isVisible, onClose, onDelete, onUpdate },
  ref
) {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(data ? data.status : "");

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleEditSubmit = (updatedData) => {
    onUpdate(updatedData);
    setEditModalVisible(false);
  };

  const handleSelectChange = (e) => {
    setSelectedColumn(e.target.value);
    onUpdate({ ...data, status: e.target.value });
  };

  useEffect(() => {
    setSelectedColumn(data ? data.status : "");
  }, [data]);

  return (
    <div ref={ref} className={`modal ${isVisible ? "visible" : ""}`}>
      <div>
        {!isEditModalVisible ? (
          <>
            {isVisible && data ? (
              <div className="modalcard">
                <RightWrapper>
                  <StyledCross icon="cross" size={25} onClick={onClose} />
                </RightWrapper>

                <h2>Job Information</h2>
                <div>
                  <h3>Status:</h3>
                  <StatusDropdown
                    value={selectedColumn}
                    onChange={handleSelectChange}
                  >
                    {columnsData.map((column) => (
                      <option key={column.title} value={column.title}>
                        {column.title}
                      </option>
                    ))}
                  </StatusDropdown>
                </div>
                {data
                  ? Object.keys(data).map((key, index) =>
                      data[key] &&
                      !["id", "user_id", "status"].includes(key) ? (
                        <div key={index}>
                          <h3>{toTitleCase(key)}:</h3>
                          <p>
                            {key === "date_applied"
                              ? new Date(data[key]).toLocaleDateString()
                              : data[key]}
                          </p>
                        </div>
                      ) : null
                    )
                  : null}
                <ButtonContainer>
                  <ButtonFilled
                    content="Edit Job Info"
                    handleClick={(e) => {
                      e.stopPropagation();
                      handleEdit();
                    }}
                  />
                  <ButtonEmpty
                    content="Delete Job"
                    handleClick={(e) => onDelete(data.id)}
                  >
                    Delete Job
                  </ButtonEmpty>
                </ButtonContainer>
              </div>
            ) : null}
          </>
        ) : (
          <EditJobModal
            ref={ref}
            isVisible={isEditModalVisible}
            onClose={() => setEditModalVisible(false)}
            onSubmit={handleEditSubmit}
            initialData={data}
          />
        )}
      </div>
    </div>
  );
});

export default JobInfoModal;

const StatusDropdown = styled.select`
  width: 200px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.primaryBlue};
  border-color: ${(props) => props.theme.colors.primaryBlue};
  color: white;
  font-size: 18px;
  border-radius: 5px;
  padding: 5px;
`;

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
  margin: 5px 0px;
  :hover {
    fill: red;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
