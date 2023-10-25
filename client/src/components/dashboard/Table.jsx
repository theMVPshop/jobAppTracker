import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import StandardCard from "../../reusable/StandardCard";
import ColumnHead from "./ColumnHead";
import ColumnBody from "./ColumnBody";
import DisplayCard from "../../reusable/DIsplayCard";
import ky from "ky";
import { Job } from "../../App";

const Table = (props) => {
  const [isCardVisible, setCardVisibility] = useState(false);
  const [rejectedCards, setRejectedCards] = useState([]);
  const [appliedCards, setAppliedCards] = useState([]);
  const [phoneCards, setPhoneCards] = useState([]);
  const [onSiteCards, setOnSiteCards] = useState([]);
  const [offerCards, setOfferCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardColumn, setCardColumn] = useState(null);
  const cardRef = useRef(null);

  const searchQuery = props.searchQuery;
  const columns = props.columns;
  const data = props.data;

  const handlePlusClick = (column) => {
    setCardVisibility(true);
    setCardColumn(column);
  };

  const handleCardSubmit = async (e, column, card) => {
    console.log("Submitting...");
    setCardVisibility(false);
    const jobInfo = `Job Title: ${card.title}
      Description: ${card.description}`;
    const categorizedData = await ky.post("http://localhost:3000/api/categorize", { json: { jobInfo }, timeout: 120000 }).json();
    const job = new Job({ position_title: card.title, company_name: categorizedData["Company Name"], date_applied: new Date().toLocaleDateString() });
    console.log(job, column);
    switch (column) {
      case "rejected":
        setRejectedCards([job, ...rejectedCards]);
        break;
      case "applied":
        setAppliedCards([job, ...appliedCards]);
        break;
      case "phone":
        setPhoneCards([job, ...phoneCards]);
        break;
      case "on site":
        setOnSiteCards([job, ...onSiteCards]);
        break;
      case "offer":
        setOfferCards([job, ...offerCards]);
        break;
      default:
        break;
    }
  }

  function handleClickOutside(event) {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setCardVisibility(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <DashboardWrapper>
      <StyledTable>
        <TableHead>
          <tr>
            {columns.map((column, index) => (
              <ColumnHead
                key={index}
                column={column}
                handlePlusClick={handlePlusClick}
              />
            ))}
          </tr>
        </TableHead>
        <tbody>
          <TableRow>
            {columns.map((column, index) => (
              <ColumnBody
                key={index}
                column={column}
                data={appliedCards.length ? appliedCards : data}
                searchQuery={searchQuery}
              />
            ))}
          </TableRow>
        </tbody>
      </StyledTable>
      <ModalOverlay isvisible={isCardVisible.toString()}>
        <div ref={cardRef}>
          <StandardCard
            onBlur={() => { setCardVisibility(false); console.log("blur") }}
            isvisible={isCardVisible.toString()}
            onCardSubmit={(e) => handleCardSubmit(e, cardColumn, card)}
          />
        </div>
      </ModalOverlay>
      <DisplayCard card={selectedCard} />
      {rejectedCards.map((card, index) => (
        <div key={index} onClick={() => handleSavedCardClick(card)}></div>
      ))}
      <DisplayCard card={selectedCard} />
      {appliedCards.map((card, index) => (
        <div key={index} onClick={() => handleSavedCardClick(card)}></div>
      ))}
      <DisplayCard card={selectedCard} />
      {phoneCards.map((card, index) => (
        <div key={index} onClick={() => handleSavedCardClick(card)}></div>
      ))}
      <DisplayCard card={selectedCard} />
      {onSiteCards.map((card, index) => (
        <div key={index} onClick={() => handleSavedCardClick(card)}></div>
      ))}
      <DisplayCard card={selectedCard} />
      {offerCards.map((card, index) => (
        <div key={index} onClick={() => handleSavedCardClick(card)}></div>
      ))}
    </DashboardWrapper>
  );
};

export default Table;

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
`;

const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  flex-grow: 1;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #fff;
`;

const TableRow = styled.tr`
  height: calc((100vh - 2em) / 5);
`;

const ModalOverlay = styled.div`
  display: ${(props) => (props.isvisible === "true" ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  cursor: pointer;
`;
