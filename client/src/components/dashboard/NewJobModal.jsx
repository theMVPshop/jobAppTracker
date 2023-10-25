import React, { useState, forwardRef } from 'react';
import "./modal.css";
import { toTitleCase } from '../../App';
import ky from 'ky';

const NewJobModal = forwardRef(function ({ isVisible, onClose, onSubmit }, ref) {
    const [isLoading, setIsLoading] = useState(false);
    const [useManualInput, setUseManualInput] = useState(false);
    const [jobUrl, setJobUrl] = useState('');
    const [jobData, setJobData] = useState({
        id: '',
        position_title: '',
        company_name: '',
        date_applied: '',
        description: '',
        status: '',
        location: '',
        job_type: '',
        salary: '',
        qualifications: '',
        responsibilities: '',
        skills: '',
        education: '',
        gpt_rating: 0,
        gpt_analysis: '',
    });

    const handleUrlSubmit = async () => {
        setIsLoading(true);
        const jobInfo = await ky.post("http://localhost:3000/api/scrape", { json: { url: jobUrl } }).text();
        const categorizedData = await ky.post("http://localhost:3000/api/categorize", { json: { jobInfo }, timeout: 300000 }).json();

        const fetchedData = {
            position_title: categorizedData.position_title || '',
            company_name: categorizedData.company_name || '',
            location: categorizedData.location || '',
            job_type: categorizedData.job_type || '',
            salary: categorizedData.salary || '',
            qualifications: categorizedData.qualifications || '',
            responsibilities: categorizedData.responsibilities || '',
            skills: categorizedData.skills || '',
            education: categorizedData.education || '',
            date_applied: new Date().toISOString().split('T')[0],
        };

        onSubmit(fetchedData);
        setJobData({
            id: '',
            gpt_rating: 0,
            gpt_analysis: '',
            description: '',
            status: '',
            date_applied: '',
            company_name: '',
            position_title: '',
            location: '',
            job_type: '',
            salary: '',
            qualifications: '',
            responsibilities: '',
            skills: '',
            education: '',
        });
        setIsLoading(false);
        setJobUrl('');
    };

    const handleManualSubmit = () => {
        onSubmit(jobData);
        setJobData({
            id: '',
            gpt_rating: 0,
            gpt_analysis: '',
            description: '',
            status: '',
            date_applied: '',
            company_name: '',
            position_title: '',
            location: '',
            job_type: '',
            salary: '',
            qualifications: '',
            responsibilities: '',
            skills: '',
            education: '',
        });
        setJobUrl('');
    };

    return (
        <div ref={ref} className={`modal ${isVisible ? 'visible' : ''}`}>
            <button onClick={onClose}>X</button>
            {useManualInput ? (
                <>
                    {Object.keys(jobData).map(key => (
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
                    ))}
                    <button onClick={handleManualSubmit}>Submit</button>
                </>
            ) : (
                <>
                    {/* URL input field */}
                    <label>
                        Find a job from a LinkedIn, Indeed, or ZipRecruiter URL
                        <input
                            type="text"
                            placeholder="Job Posting URL"
                            value={jobUrl}
                            onChange={(e) => setJobUrl(e.target.value)}
                        />
                    </label>
                    {isLoading ? <><progress /> <p>Finding job information, this may take up to a minute or longer...</p></> : null}
                    <button disabled={isLoading} onClick={handleUrlSubmit}>Submit</button>
                </>
            )}
            <button onClick={() => setUseManualInput(!useManualInput)}>
                {useManualInput ? 'Use URL' : 'Manual Input'}
            </button>
        </div>
    );
});

export default NewJobModal;