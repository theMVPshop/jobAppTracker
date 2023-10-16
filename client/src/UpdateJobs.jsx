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

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const data = await ky(`http://localhost:3000/api/jobs/users/${"test"}/applications`).json();
            setApplications(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const deleteApplication = async (application_id) => {
        try {
            await ky.delete(`http://localhost:3000/api/jobs/users/${"test"}/applications/${application_id}`);
            fetchApplications();
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    }

    const updateApplication = async (application_id) => {
        try {
            await ky.put(`http://localhost:3000/api/jobs/users/${"test"}/applications/${application_id}`, { json: formData });
            fetchApplications();
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    }

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
            await ky.post(`http://localhost:3000/api/jobs/users/${"test"}/applications`, { json: formData });
            fetchApplications();
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
                        <h2>Job #{app.application_id}</h2>
                        <button onClick={() => deleteApplication(app.application_id)}>Delete</button>
                        <button onClick={() => updateApplication(app.application_id)}>Update (with info from form at top)</button>
                        <ul>
                            <li>GPT Rating: {app.gpt_rating}</li>
                            <li>Status: {app.status}</li>
                            <li>Company Name: {app.company_name}</li>
                            <li>Position Title: {app.position_title}</li>
                            <li>Work Location: {app.work_location}</li>
                            <li>Requested Experience: {app.requested_experience}</li>
                            <li>Requested Education: {app.requested_education}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpdateJobs;