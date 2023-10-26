import React, { forwardRef } from "react";
import "./modal.css";
import styled from "styled-components";
import ButtonFilled from "../../reusable/ButtonFilled";
import ButtonEmpty from "../../reusable/ButtonEmpty";

const ConfirmDeleteModal = forwardRef(function (
  { isVisible, onClose, onConfirm },
  ref
) {
  return (
    <div ref={ref} className={`modal ${isVisible ? "visible" : ""}`}>
      {isVisible ? (
        <div className="deletemodalcard">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this job?</p>
          <ButtonContainer>
            <ButtonFilled content="Yes, Delete" handleClick={onConfirm} />
            <ButtonEmpty content="Cancel" handleClick={onClose} />
          </ButtonContainer>
        </div>
      ) : null}
    </div>
  );
});

export default ConfirmDeleteModal;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
