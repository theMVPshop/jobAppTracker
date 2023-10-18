import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import StandardCard from "../../reusable/StandardCard";
import ColumnHead from "./ColumnHead";
import ColumnBody from "./ColumnBody";
import DisplayCard from "../../reusable/DIsplayCard";
import ky from "ky";

const Table = (props) => {
  const [isCardVisible, setCardVisibility] = useState(false);
  const [rejectedCards, setRejectedCards] = useState([]);
  const [appliedCards, setAppliedCards] = useState([]);
  const [phoneCards, setPhoneCards] = useState([]);
  const [onSiteCards, setOnSiteCards] = useState([]);
  const [offerCards, setOfferCards] = useState([]);

  const searchQuery = props.searchQuery;
  const columns = props.columns;
  const data = props.data;

  const handlePlusClick = (column) => {
    setCardVisibility(true);
    setCardColumn(column);
  };

  const handleCardSubmit = (column, card) => {
    setCardVisibility(false);
    const apiEndpoint = `http://localhost:3000/api/saveCard`; // Replace with your actual API endpoint
    ky.post(apiEndpoint, {
      json: { column, card },
    }).then(async (response) => {
      // Handle the API response as needed
      if (response.status === 200) {
        // Card saved successfully, you can update state or show a message
      } else {
        console.error("Failed to save card:", await response.text());
        // Handle error
      }
    });
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
                  data={data}
                  searchQuery={searchQuery}
                />
              ))}
            </TableRow>
          </tbody>
        </StyledTable>
        <ModalOverlay isVisible={isCardVisible}>
          <StandardCard
            isVisible={isCardVisible}
            onCardSubmit={(card) => handleCardSubmit(cardColumn, card)}
          />
        </ModalOverlay>
        <DisplayCard card={selectedCard} onSomeAction={handleSomeAction} />
        {rejectedCards.map((card, index) => (
          <div key={index} onClick={() => handleSavedCardClick(card)}></div>
        ))}
        <DisplayCard card={selectedCard} onSomeAction={handleSomeAction} />
        {appliedCards.map((card, index) => (
          <div key={index} onClick={() => handleSavedCardClick(card)}></div>
        ))}
        <DisplayCard card={selectedCard} onSomeAction={handleSomeAction} />
        {phoneCards.map((card, index) => (
          <div key={index} onClick={() => handleSavedCardClick(card)}></div>
        ))}
        <DisplayCard card={selectedCard} onSomeAction={handleSomeAction} />
        {onSiteCards.map((card, index) => (
          <div key={index} onClick={() => handleSavedCardClick(card)}></div>
        ))}
        <DisplayCard card={selectedCard} onSomeAction={handleSomeAction} />
        {offerCards.map((card, index) => (
          <div key={index} onClick={() => handleSavedCardClick(card)}></div>
        ))}
      </DashboardWrapper>
    );
  };
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
