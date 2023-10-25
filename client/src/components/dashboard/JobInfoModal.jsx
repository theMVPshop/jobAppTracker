import React, { useState, forwardRef } from "react";
import "./modal.css";
import EditJobModal from "./EditJobModal";
import { toTitleCase } from "../../App";

const JobInfoModal = forwardRef(function ({ data, isVisible, onClose, onDelete, onUpdate }, ref) {
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleEditSubmit = (updatedData) => {
    onUpdate(updatedData);
    setEditModalVisible(false);
  };

  return (
    <div ref={ref} className={`modal ${isVisible ? 'visible' : ''}`}>
      {isVisible && data ? (
        <div className="modal-content">
          <button onClick={onClose}>X</button>
          <button onClick={(e) => { e.stopPropagation(); handleEdit(); }}>Edit Job Info</button>
          <h2>Job Information</h2>
          {data ? Object.keys(data).map((key, index) => (
            data[key] && !['id', 'status'].includes(key) ? (
              <div key={index}>
                <h3>{toTitleCase(key)}:</h3>
                <p>
                  {key === "date_applied" ?
                    new Date(data[key]).toLocaleDateString()
                    : data[key]}
                </p>
              </div>
            ) : null
          )) : null}
          <button onClick={(e) => onDelete(data.id)}>Delete Job</button>
        </div>
      ) : null}
      <EditJobModal
        ref={ref}
        isVisible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleEditSubmit}
        initialData={data}
      />
    </div>
  );
});

export default JobInfoModal;