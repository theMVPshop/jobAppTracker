import React, { useEffect, useState, useRef } from "react";
import Column from "./Column";
import JobInfoModal from "./JobInfoModal";
import NewJobModal from "./NewJobModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useAuth0 } from "@auth0/auth0-react";
import ky from "ky";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import ColumnHead from "./ColumnHead";

const Dashboard = (props) => {
  const initialData = props.props;
  const searchQuery = props.searchQuery;
  const { isAuthenticated, loginWithPopup, user } = useAuth0();
  const [columnsData, setColumnsData] = useState(initialData);
  const [jobInfoModalData, setJobInfoModalData] = useState(null);
  const [isNewJobModalVisible, setNewJobModalVisible] = useState(false);
  const [currentColumn, setCurrentColumn] = useState("Applied");
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [isLoadingNewJob, setIsLoadingNewJob] = useState(false);
  const modalRef = useRef(null);

  const reorganizeColumns = (jobs) => {
    const organizedData = initialData.map((column) => ({
      ...column,
      data: [],
    })); // Reset data in each column

    jobs.forEach((job) => {
      const jobStatus = job.status ? job.status : "Applied"; // Set status to "Applied" if it's null
      const columnIndex = organizedData.findIndex(
        (column) => column.title === jobStatus
      );
      if (columnIndex !== -1) {
        organizedData[columnIndex].data.push(job);
      }
    });

    return organizedData;
  };

  const handlePlusClick = (columnTitle) => {
    // console.log(`Add card to ${columnTitle}`);
    setNewJobModalVisible(true);
    setCurrentColumn(columnTitle);
  };

  const handleCardClick = (cardData) => {
    setJobInfoModalData(cardData);
  };

  const handleCloseModal = () => {
    setJobInfoModalData(null);
  };

  const handleUpdateJob = async (updatedData, newStatus = null) => {
    try {
      const updatedJobData = {
        ...updatedData,
        status: newStatus || updatedData.status,
      };

      const response = await ky
        .put(
          `http://localhost:3000/api/users/${user.sub}/applications/${updatedData.id}`,
          { json: updatedJobData }
        )
        .json();

      if (jobInfoModalData && jobInfoModalData.id === response.id) {
        setJobInfoModalData(updatedJobData);
      }

      const updateColumnsData = (columns, job) => {
        let jobRemoved = false;
        let updatedColumns = columns.map((column) => {
          const jobIndex = column.data.findIndex((item) => item.id === job.id);
          if (jobIndex > -1) {
            jobRemoved = true;
            return {
              ...column,
              data: [
                ...column.data.slice(0, jobIndex),
                ...column.data.slice(jobIndex + 1),
              ],
            };
          } else {
            return column;
          }
        });

        if (jobRemoved) {
          updatedColumns = updatedColumns.map((column) => {
            if (column.title === job.status) {
              return {
                ...column,
                data: [...column.data, job],
              };
            } else {
              return column;
            }
          });
        }

        return updatedColumns;
      };

      // Use the updateColumnsData function to get the updated columns data
      const updatedColumnsData = updateColumnsData(columnsData, updatedJobData);

      // Set the updated columns data
      setColumnsData(updatedColumnsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRequest = (id) => {
    console.log("Delete request for job with id:", id);
    setJobToDelete(id);
    setConfirmModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (jobToDelete) {
      handleDeleteCard(jobToDelete);
      if (jobInfoModalData && jobInfoModalData.id === jobToDelete) {
        setJobInfoModalData(null); // Close the JobInfoModal if the deleted job is currently displayed
      }
    }
    setConfirmModalVisible(false);
    setJobToDelete(null);
  };

  const handleDeleteCard = async (id) => {
    console.log(id);

    await ky.delete(
      `http://localhost:3000/api/users/${user.sub}/applications/${id}`
    );

    setColumnsData((prevColumnsData) => {
      return prevColumnsData.map((column) => {
        // Find the index of the job with the given id in the current column
        const jobIndex = column.data.findIndex((job) => job.id === id);
        if (jobIndex !== -1) {
          // If the job is found, create a new data array without that job
          const newData = [
            ...column.data.slice(0, jobIndex),
            ...column.data.slice(jobIndex + 1),
          ];
          return {
            ...column,
            data: newData,
          };
        }
        return column; // If the job is not found, return the column unchanged
      });
    });
  };

  const handleJobSubmit = async (jobData) => {

    const status = currentColumn;

    jobData = { ...jobData, status };

    const resumeText = await ky(
      `http://localhost:3000/api/resume/users/${user.sub}`
    ).text();
    const jobInfo = JSON.stringify(jobData);

    const gptResponse = await ky
      .post(`http://localhost:3000/api/resume/rate`, {
        json: { resumeText, jobInfo },
      })
      .text();

    const gpt_rating = parseInt(gptResponse.slice(0, 1));
    const periodIndex = gptResponse.indexOf(".");
    const gpt_analysis = gptResponse.slice(periodIndex + 2);

    jobData = { ...jobData, gpt_rating, gpt_analysis };

    const { applicationId } = await ky
      .post(`http://localhost:3000/api/users/${user.sub}/applications`, {
        json: jobData,
      })
      .json();

    // Create a new job object (assuming jobData is the new job's data)
    let newJob = { ...jobData, id: applicationId, status };

    // Update the columnsData state to include the new job in the correct column
    setColumnsData((prevColumnsData) => {
      return prevColumnsData.map((column) => {
        if (column.title === status) {
          return {
            ...column,
            data: [newJob, ...column.data],
          };
        }
        return column;
      });
    });

    setNewJobModalVisible(false); // Close the modal
    setIsLoadingNewJob(false);
  };

  const login = () => {
    if (!isAuthenticated) {
      loginWithPopup().then(() => {
        console.log(user?.sub);
      });
    }
  };

  const fetchData = async () => {
    try {
      const jobs = await ky
        .get(`http://localhost:3000/api/users/${user.sub}/applications`)
        .json();
      const organizedData = reorganizeColumns(jobs);
      setColumnsData(organizedData);
    } catch (error) {
      console.error(error);
    }
  };

  const icons = ["cross", "tick", "phone", "home", "hand"];

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  useEffect(() => { }, [columnsData]);



  // function handleClickOutside(event) {
  //   console.log(modalRef.current);
  //   if (modalRef.current && !modalRef.current.contains(event.target)) {
  //     setNewJobModalVisible(false);
  //     setConfirmModalVisible(false);
  //     handleCloseModal();
  //   }
  // }
  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true);
  //   };
  // }, []);

  return (
    <HorizontalWrapper>
      <SideNav>
        <Sidebar />
      </SideNav>
      <DashboardWrapper>
        <div className="dashboard">
          {!isAuthenticated ? (
            <button onClick={login}>Login</button>
          ) : (
            <>
              <StyledTable>
                <TableHead>
                  <tr>
                    {columnsData.map((column, index) => (
                      <ColumnHead
                        key={index}
                        title={column.title}
                        data={column.data}
                        icons={icons[index]}
                        column={column}
                        handlePlusClick={handlePlusClick}
                      />
                    ))}
                  </tr>
                </TableHead>
                <tbody>
                  <TableRow>
                    {columnsData.map((column, index) => (
                      <Column
                        key={index}
                        title={column.title}
                        data={column.data}
                        searchQuery={searchQuery}
                        onCardDelete={handleDeleteRequest}
                        onPlusClick={handlePlusClick}
                        onCardClick={handleCardClick}
                      />
                    ))}
                  </TableRow>
                </tbody>
              </StyledTable>
              <JobInfoModal
                ref={modalRef}
                data={jobInfoModalData}
                isVisible={jobInfoModalData !== null}
                onDelete={handleDeleteRequest}
                onClose={handleCloseModal}
                onUpdate={handleUpdateJob}
              />
              <NewJobModal
                ref={modalRef}
                isVisible={isNewJobModalVisible}
                onClose={() => setNewJobModalVisible(false)}
                onSubmit={handleJobSubmit}
                currentColumn={currentColumn}
                icons={icons}
                isLoading={isLoadingNewJob}
                setIsLoading={setIsLoadingNewJob}
              />
              <ConfirmDeleteModal
                ref={modalRef}
                isVisible={isConfirmModalVisible}
                onClose={() => setConfirmModalVisible(false)}
                onConfirm={handleConfirmDelete}
              />
            </>
          )}
        </div>
      </DashboardWrapper>
    </HorizontalWrapper>
  );
};

export default Dashboard;

const HorizontalWrapper = styled.div`
  display: flex;
  width: 100%;
  /* overflow-x: scroll; */
  margin-top: 60px;
`;

const SideNav = styled.div`
  position: fixed;
  z-index: 2;
`;

const DashboardWrapper = styled.div`
  margin-left: 54px;
  display: flex;
  flex-direction: column;
`;

const StyledTable = styled.table`
  width: 100%;
  height: calc(100vh - 60px);

  table-layout: fixed;
  flex-grow: 1;
  border-collapse: collapse;
  border-left: 1px solid ${(props) => props.theme.colors.gray2};
`;

const TableHead = styled.thead`
  background-color: #fff;
`;

const TableRow = styled.tr`
  /* height: calc((100vh - 2em) / 5); */
`;
