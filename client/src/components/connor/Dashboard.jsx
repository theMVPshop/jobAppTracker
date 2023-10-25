// import React, { useEffect, useState } from "react";
// import Column from "../dashboard/Column";
// import JobInfoModal from "../dashboard/JobInfoModal";
// import NewJobModal from "../dashboard/NewJobModal";
// import ConfirmDeleteModal from "../dashboard/ConfirmDeleteModal";
// import { useAuth0 } from "@auth0/auth0-react";
// import ky from "ky";

// const Dashboard = ({ initialData }) => {
//     const { isAuthenticated, loginWithPopup, user } = useAuth0();
//     const [columnsData, setColumnsData] = useState(initialData);
//     const [jobInfoModalData, setJobInfoModalData] = useState(null);
//     const [isNewJobModalVisible, setNewJobModalVisible] = useState(false);
//     const [currentColumn, setCurrentColumn] = useState('Applied');
//     const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
//     const [jobToDelete, setJobToDelete] = useState(null);

//     const reorganizeColumns = (jobs) => {
//         const organizedData = initialData.map(column => ({ ...column, data: [] }));  // Reset data in each column

//         jobs.forEach(job => {
//             const jobStatus = job.status ? job.status : "Applied";  // Set status to "Applied" if it's null
//             const columnIndex = organizedData.findIndex(column => column.title === jobStatus);
//             if (columnIndex !== -1) {
//                 organizedData[columnIndex].data.push(job);
//             }
//         });

//         return organizedData;
//     };

//     const handlePlusClick = (columnTitle) => {
//         console.log(`Add card to ${columnTitle}`);
//         setNewJobModalVisible(true);
//         setCurrentColumn(columnTitle);
//     };

//     const handleCardClick = (cardData) => {
//         setJobInfoModalData(cardData);
//     };

//     const handleCloseModal = () => {
//         setJobInfoModalData(null);
//     };

//     const handleUpdateJob = async (updatedData, newStatus = null) => {
//         try {
//             // Here, newStatus will default to null if not provided
//             const updatedJobData = { ...updatedData, status: newStatus || updatedData.status };

//             // Making a PUT request to update the job data on the server using ky
//             const response = await ky.put(
//                 `http://localhost:3000/api/users/${user.sub}/applications/${updatedData.id}`,
//                 { json: updatedJobData }
//             ).json();

//             // Updating the local state to reflect the changes
//             setColumnsData((prevColumnsData) => {
//                 return prevColumnsData.map((column) => {
//                     return {
//                         ...column,
//                         data: column.data.map((job) => {
//                             if (job.id === response.id) {
//                                 // If the updated job is currently being displayed in the JobInfoModal,
//                                 // update the jobInfoModalData state as well
//                                 if (jobInfoModalData && jobInfoModalData.id === response.id) {
//                                     setJobInfoModalData(response);
//                                 }
//                                 return response;  // Replace the existing job data with the updated data from the server
//                             }
//                             return job;  // Return the existing job data unchanged
//                         }),
//                     };
//                 });
//             });

//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleDeleteRequest = (id) => {
//         console.log("Delete request for job with id:", id)
//         setJobToDelete(id);
//         setConfirmModalVisible(true);
//     };

//     const handleConfirmDelete = () => {
//         if (jobToDelete) {
//             handleDeleteCard(jobToDelete);
//             if (jobInfoModalData && jobInfoModalData.id === jobToDelete) {
//                 setJobInfoModalData(null);  // Close the JobInfoModal if the deleted job is currently displayed
//             }
//         }
//         setConfirmModalVisible(false);
//         setJobToDelete(null);
//     };

//     const handleDeleteCard = async (id) => {
//         console.log(id);

//         await ky.delete(`http://localhost:3000/api/users/${user.sub}/applications/${id}`);

//         setColumnsData((prevColumnsData) => {
//             return prevColumnsData.map((column) => {
//                 // Find the index of the job with the given id in the current column
//                 const jobIndex = column.data.findIndex(job => job.id === id);
//                 if (jobIndex !== -1) {
//                     // If the job is found, create a new data array without that job
//                     const newData = [...column.data.slice(0, jobIndex), ...column.data.slice(jobIndex + 1)];
//                     return {
//                         ...column,
//                         data: newData
//                     };
//                 }
//                 return column;  // If the job is not found, return the column unchanged
//             });
//         });
//     };

//     const handleJobSubmit = async (jobData) => {

//         jobData = { ...jobData, status: currentColumn };

//         const { applicationId } = await ky.post(`http://localhost:3000/api/users/${user.sub}/applications`, { json: jobData }).json();

//         // Create a new job object (assuming jobData is the new job's data)
//         const newJob = { ...jobData, id: applicationId, status: currentColumn };

//         console.log(newJob)

//         // Update the columnsData state to include the new job in the correct column
//         setColumnsData((prevColumnsData) => {
//             return prevColumnsData.map((column) => {
//                 if (column.title === currentColumn) {
//                     return {
//                         ...column,
//                         data: [newJob, ...column.data],
//                     };
//                 }
//                 return column;
//             });
//         });

//         setNewJobModalVisible(false);  // Close the modal
//     };

//     const login = () => {
//         if (!isAuthenticated) {
//             loginWithPopup().then(() => {
//                 console.log(user?.sub);
//             });
//         }
//     }

//     const fetchData = async () => {
//         try {
//             const jobs = await ky.get(`http://localhost:3000/api/users/${user.sub}/applications`).json();
//             const organizedData = reorganizeColumns(jobs);
//             setColumnsData(organizedData);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         if (isAuthenticated) {
//             fetchData();
//         }
//     }, [isAuthenticated]);

//     return (
//         <div className="dashboard">
//             {!isAuthenticated ? <button onClick={login}>Login</button> : (
//                 <>

//                     {columnsData.map((column, index) => (
//                         <Column key={index} title={column.title} data={column.data} onCardDelete={handleDeleteRequest} onPlusClick={handlePlusClick} onCardClick={handleCardClick} />
//                     ))}
//                     <JobInfoModal
//                         data={jobInfoModalData}
//                         isVisible={jobInfoModalData !== null}
//                         onDelete={handleDeleteRequest}
//                         onClose={handleCloseModal}
//                         onUpdate={handleUpdateJob}
//                     />
//                     <NewJobModal
//                         isVisible={isNewJobModalVisible}
//                         onClose={() => setNewJobModalVisible(false)}
//                         onSubmit={handleJobSubmit}
//                     />
//                     <ConfirmDeleteModal
//                         isVisible={isConfirmModalVisible}
//                         onClose={() => setConfirmModalVisible(false)}
//                         onConfirm={handleConfirmDelete}
//                     />
//                 </>)}
//         </div>
//     );
// };

// export default Dashboard;