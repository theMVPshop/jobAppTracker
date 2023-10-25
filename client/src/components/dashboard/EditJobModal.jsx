import React, { useState, useEffect, forwardRef } from 'react';
import "./modal.css";
import { toTitleCase } from '../../App';

const EditJobModal = forwardRef(function ({ isVisible, onClose, onSubmit, initialData }, ref) {
    const [jobData, setJobData] = useState(initialData || {});

    useEffect(() => {
        if (initialData) {
            setJobData(initialData);  // Update jobData when initialData changes
        }
    }, [initialData]);

    const handleEditSubmit = () => {
        onSubmit(jobData);
    };

    return (
        <div ref={ref} className={`modal ${isVisible ? 'visible' : ''}`}>
            <button onClick={onClose}>X</button>
            <div>
                {initialData ? Object.keys(initialData).map(key => (
                    !['id', 'gpt_rating', 'gpt_analysis', 'status'].includes(key) ? (
                        <label key={key}>
                            {toTitleCase(key)}
                            <input
                                type={key === 'date_applied' ? 'date' : 'text'}
                                placeholder={toTitleCase(key)}
                                value={jobData[key] || ''}
                                onChange={(e) => setJobData({ ...jobData, [key]: e.target.value })}
                            />
                        </label>
                    ) : null
                )) : null}
                <button onClick={handleEditSubmit}>Submit</button>
            </div>
        </div>
    );
});

export default EditJobModal;
