import React, { useState, useEffect } from "react";
import Card from "./Card";
import styled from "styled-components";
import ButtonEmpty from "../../reusable/ButtonEmpty";

const Column = ({
  title,
  data,
  onPlusClick,
  onCardClick,
  onCardDelete,
  searchQuery,
}) => {
  const [color, setColor] = useState("#fff");

  useEffect(() => {
    if (title === "Rejected") {
      setColor("#F6F7F8");
    }
  }, [setColor, title]);

  return (
    <TableCell style={{ backgroundColor: color }}>
      {data.length
        ? data
            .filter((cardData) => {
              if (searchQuery === "" || searchQuery === undefined) {
                return cardData;
              } else if (
                cardData.position_title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                cardData.company_name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              ) {
                return cardData;
              }
            })
            .map((cardData, index) => (
              <Card
                key={index}
                data={cardData}
                onDelete={onCardDelete}
                onClick={() => onCardClick(cardData)}
              />
            ))
        : null}
    </TableCell>
  );
};

export default Column;

const TableCell = styled.td`
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: top;
  position: relative;
  width: 370px;
  min-width: 370px;
`;
