import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import StandardTable from "../../reusable/StandardTable";
import StandardCard from "../../reusable/StandardCard";
import Sidebar from "./Sidebar";
import Table from "./Table";


const Dashboard = (props) => {
  const columns = ["Rejected", "Applied", "Phone", "Onsite", "Offer"];

  const searchQuery = props.searchQuery;

  //temporary data
  const data = [
    "Job Title 1",
    "Job Title 2",
    "Job Title 3",
    "Job Title 4",
    "Job Title 5",
  ];

  return (
    <HorizontalWrapper>
      <Sidebar />
      <Table data={data} columns={columns} searchQuery={searchQuery} />
    </HorizontalWrapper>
  );
};

export default Dashboard;

const HorizontalWrapper = styled.div`
  display: flex;
`;
