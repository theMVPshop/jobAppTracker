import React, { useState } from "react";
import styled from "styled-components";
import StandardTable from "../../reusable/StandardTable";
import StandardCard from "../../reusable/StandardCard";
import Sidebar from "./Sidebar";

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  flex-grow: 1;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f0f0f0;
`;

const TableRow = styled.tr`
  height: calc((100vh - 2em) / 5);
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: top;
  position: relative;
`;

const PlusButton = styled.button`
  position: relative;
  bottom: 1px;
  right: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  margin: 10px;
`;

const InfoCard = styled.div`
  padding: 10px;
  margin: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ModalOverlay = styled.div`
  display: ${(props) => (props.isVisible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Dashboard = () => {
  const [isCardVisible, setCardVisibility] = useState(false);

  const handlePlusClick = () => {
    setCardVisibility(!isCardVisible);
  };

  return (
    <HorizontalWrapper>
      <Sidebar />
      <DashboardWrapper>
        <StyledTable>
          <TableHead>
            <tr>
              <TableCell>
                <div>Rejected</div>
                <div>
                  <PlusButton onClick={handlePlusClick}>+</PlusButton>
                </div>
              </TableCell>
              <TableCell>
                <div>Applied</div>
                <div>
                  <PlusButton onClick={handlePlusClick}>+</PlusButton>
                </div>
              </TableCell>
              <TableCell>
                <div>Phone</div>
                <div>
                  <PlusButton onClick={handlePlusClick}>+</PlusButton>
                </div>
              </TableCell>
              <TableCell>
                <div>On Site</div>
                <div>
                  <PlusButton onClick={handlePlusClick}>+</PlusButton>
                </div>
              </TableCell>
              <TableCell>
                <div>Offer</div>
                <div>
                  <PlusButton onClick={handlePlusClick}>+</PlusButton>
                </div>
              </TableCell>
            </tr>
          </TableHead>
          <tbody>
            <TableRow>
              <TableCell>
                <InfoCard>Info Card 1</InfoCard>
              </TableCell>
              <TableCell>
                <InfoCard>Info Card 3</InfoCard>
              </TableCell>
              <TableCell>
                <InfoCard>Info Card 5</InfoCard>
              </TableCell>
              <TableCell>
                <InfoCard>Info Card 7</InfoCard>
              </TableCell>
              <TableCell>
                <InfoCard>Info Card 9</InfoCard>
              </TableCell>
            </TableRow>
          </tbody>
        </StyledTable>
        <ModalOverlay isVisible={isCardVisible}>
          <StandardCard
            isVisible={isCardVisible}
            setCardVisibility={setCardVisibility}
          />
        </ModalOverlay>
      </DashboardWrapper>
    </HorizontalWrapper>
  );
};

export default Dashboard;

const HorizontalWrapper = styled.div`
  display: flex;
`;
