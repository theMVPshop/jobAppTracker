import React, { useState, useEffect } from 'react';
import ky from 'ky';
import { useAuth0 } from '@auth0/auth0-react';

const UpdateJobs = () => {
    const { user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const [applications, setApplications] = useState([]);
    const [formData, setFormData] = useState({
        gpt_rating: '',
        status: '',
        company_name: '',
        position_title: '',
        work_location: '',
        requested_experience: '',
        requested_education: ''
    });

    const application_id = null;

    const fetchApplications = async () => {
        try {
            const data = await ky(`http://localhost:3000/api/jobs/users/${"test"}/applications`).json();
            setApplications(data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (application_id) {
                // Update existing application
                await ky.put(`http://localhost:3000/api/jobs/users/${user?.sub}/applications/${1}`, { json: formData });
            } else {
                // Create new application
                console.log("Sending application")
                await ky.post(`http://localhost:3000/api/jobs/users/${"test"}/applications`, { json: formData });
            }
            //fetchApplications();  // Refresh the applications list
        } catch (error) {
            console.error('Error submitting application:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    GPT Rating:
                    <input
                        type="text"
                        name="gpt_rating"
                        value={formData.gpt_rating}
                        onChange={handleInputChange}
                        placeholder="GPT Rating"
                    />
                </label>
                <label>
                    Status:
                    <input
                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        placeholder="Status"
                    />
                </label>
                <label>
                    Company Name:
                    <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleInputChange}
                        placeholder="Company Name"
                    />
                </label>
                <label>
                    Position Title:
                    <input
                        type="text"
                        name="position_title"
                        value={formData.position_title}
                        onChange={handleInputChange}
                        placeholder="Position Title"
                    />
                </label>
                <label>
                    Work Location:
                    <input
                        type="text"
                        name="work_location"
                        value={formData.work_location}
                        onChange={handleInputChange}
                        placeholder="Work Location"
                    />
                </label>
                <label>
                    Requested Experience:
                    <input
                        type="text"
                        name="requested_experience"
                        value={formData.requested_experience}
                        onChange={handleInputChange}
                        placeholder="Requested Experience"
                    />
                </label>
                <label>
                    Requested Education:
                    <input
                        type="text"
                        name="requested_education"
                        value={formData.requested_education}
                        onChange={handleInputChange}
                        placeholder="Requested Education"
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <div>
                <h2>Applications</h2>
                <button onClick={fetchApplications}>Fetch Applications</button>
                {applications.map(app => (
                    <div key={app.application_id}>
                        <p>GPT Rating: {app.gpt_rating}</p>
                        <p>Status: {app.status}</p>
                        <p>Company Name: {app.company_name}</p>
                        <p>Position Title: {app.position_title}</p>
                        <p>Work Location: {app.work_location}</p>
                        <p>Requested Experience: {app.requested_experience}</p>
                        <p>Requested Education: {app.requested_education}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpdateJobs;