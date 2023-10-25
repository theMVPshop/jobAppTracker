import React, { forwardRef } from 'react';
import './modal.css';

const ConfirmDeleteModal = forwardRef(function ({ isVisible, onClose, onConfirm }, ref) {
    return (
        <div ref={ref} className={`modal ${isVisible ? 'visible' : ''}`}>
            {isVisible ? (
                <div className="modal-content">
                    <h2>Confirm Deletion</h2>
                    <p>Are you sure you want to delete this job?</p>
                    <button onClick={onConfirm}>Yes, Delete</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            ) : null}
        </div>
    );
});

export default ConfirmDeleteModal;