import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import StandardTable from "../../reusable/StandardTable";
import StandardCard from "../../reusable/StandardCard";
import Sidebar from "./Sidebar";
import UploadFile from "../../UploadFile";
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
  z-index: 9999;
  cursor: pointer;
`;

const Dashboard = () => {
  const [isCardVisible, setCardVisibility] = useState(false);
  const [rejectedCards, setRejectedCards] = useState([]);
  const [appliedCards, setAppliedCards] = useState([]);
  const [phoneCards, setPhoneCards] = useState([]);
  const [onSiteCards, setOnSiteCards] = useState([]);
  const [offerCards, setOfferCards] = useState([]);

  const handlePlusClick = (column) => {
    setCardVisibility(true);
    setCardColumn(column);
  };

  const handleCardSubmit = (column, card) => {
    setCardVisibility(false);
    switch (column) {
      case "rejected":
        setRejectedCards([...rejectedCards, card]);
        break;
      case "applied":
        setAppliedCards([...appliedCards, card]);
        break;
      case "phone":
        setPhoneCards([...phoneCards, card]);
        break;
      case "on site":
        setOnSiteCards([...onSiteCards, card]);
        break;
      case "offer":
        setOfferCards([...offerCards, card]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (isCardVisible) {
        const modal = document.querySelector(".modal-content");
        if (modal && !modal.contains(event.target)) {
          setCardVisibility(false);
        }
      }
    }

    if (isCardVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isCardVisible]);

  const data = [
    ["Info Card 1", "Info Card 2", "Info Card 3", "Info Card 4", "Info Card 5"],
  ];

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
      <UploadFile></UploadFile>
    </HorizontalWrapper>
  );
};

export default Dashboard;

const HorizontalWrapper = styled.div`
  display: flex;
`;
