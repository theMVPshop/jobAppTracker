import React, { useState, useEffect } from 'react';
import ky from 'ky';
import { useAuth0 } from '@auth0/auth0-react';

const UpdateJobs = () => {
    const { user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const [applications, setApplications] = useState([]);
    const [newApplicationData, setNewApplicationData] = useState({
        gpt_rating: 5,
        gpt_analysis: "",
        status: "",
        description: "",
        date_applied: new Date().toISOString(),
        company_name: "",
        position_title: "",
        location: "",
        skills: "",
        experience: "",
        salary: ""
    });

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const data = await ky(`http://localhost:3000/api/applications/users/${"test"}/applications`).json();
            setApplications(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const deleteApplication = async (application_id) => {
        try {
            await ky.delete(`http://localhost:3000/api/applications/users/${"test"}/applications/${application_id}`);
            fetchApplications();
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    }

    const updateApplication = async (application_id) => {
        try {
            await ky.put(`http://localhost:3000/api/applications/users/${"test"}/applications/${application_id}`, { json: newApplicationData });
            fetchApplications();
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewApplicationData({
            ...newApplicationData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await ky.post(`http://localhost:3000/api/applications/users/${"test"}/applications`, { json: newApplicationData });
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
                        type="number"
                        min={1}
                        max={5}
                        name="gpt_rating"
                        value={newApplicationData.gpt_rating}
                        onChange={handleInputChange}
                        placeholder="GPT Rating"
                    />
                </label>
                <label>
                    GPT Analysis:
                    <textarea
                        name="gpt_analysis"
                        value={newApplicationData.gpt_analysis}
                        onChange={handleInputChange}
                        placeholder="GPT Analysis"
                    />
                </label>
                <label>
                    Status:
                    <input
                        type="text"
                        name="status"
                        value={newApplicationData.status}
                        onChange={handleInputChange}
                        placeholder="Status"
                    />
                </label>
                <label>
                    Job Description:
                    <textarea
                        name="description"
                        value={newApplicationData.description}
                        onChange={handleInputChange}
                        placeholder="Job Description"
                    />
                </label>
                <label>
                    Date Applied:
                    <input
                        type="datetime-local"
                        name="date_applied"
                        value={newApplicationData.date_applied}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Company Name:
                    <input
                        type="text"
                        name="company_name"
                        value={newApplicationData.company_name}
                        onChange={handleInputChange}
                        placeholder="Company Name"
                    />
                </label>
                <label>
                    Position Title:
                    <input
                        type="text"
                        name="position_title"
                        value={newApplicationData.position_title}
                        onChange={handleInputChange}
                        placeholder="Position Title"
                    />
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={newApplicationData.ocation}
                        onChange={handleInputChange}
                        placeholder="Location"
                    />
                </label>
                <label>
                    Skills:
                    <textarea
                        name="skills"
                        value={newApplicationData.skills}
                        onChange={handleInputChange}
                        placeholder="Skills"
                    />
                </label>
                <label>
                    Experience:
                    <textarea
                        name="experience"
                        value={newApplicationData.experience}
                        onChange={handleInputChange}
                        placeholder="Requested Experience"
                    />
                </label>
                <label>
                    Salary:
                    <input
                        type="text"
                        name="salary"
                        value={newApplicationData.salary}
                        onChange={handleInputChange}
                        placeholder="Salary"
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <div>
                <h2>Applications</h2>
                <button onClick={fetchApplications}>Fetch Applications</button>
                {applications.map(application => (
                    <div key={application.id}>
                        <h2>Job #{application.id}</h2>
                        <button onClick={() => deleteApplication(application.id)}>Delete</button>
                        <button onClick={() => updateApplication(application.id)}>Update (with info from form at top)</button>
                        <ul>
                            <li>GPT Rating: {application.gpt_rating}</li>
                            <li>GPT Analysis: {application.gpt_analysis}</li>
                            <li>Status: {application.status}</li>
                            <li>Job Description: {application.description}</li>
                            <li>Date Applied: {application.date_applied}</li>
                            <li>Company Name: {application.company_name}</li>
                            <li>Position Title: {application.position_title}</li>
                            <li>Location: {application.location}</li>
                            <li>Skills: {application.skills}</li>
                            <li>Experience: {application.experience}</li>
                            <li>Salary: {application.salary}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpdateJobs;