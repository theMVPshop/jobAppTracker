import React from "react";
import Card from "./Card";
import styled from "styled-components";
import ButtonEmpty from "../../reusable/ButtonEmpty";

const Column = ({ title, data, onPlusClick, onCardClick, onCardDelete }) => {
    return (
        <>
            <TableHead>
                <tr>
                    <TableCell>
                        <ButtonEmpty content="+" handleClick={() => onPlusClick(title)} />
                    </TableCell>
                </tr>
            </TableHead>
            <tbody>
                <TableRow>
                    {data.length ? (data.map((cardData, index) => (
                        <Card key={index} data={cardData} onDelete={onCardDelete} onClick={() => onCardClick(cardData)} />
                    ))) : null}
                </TableRow>
            </tbody>
        </>
    );
};

export default Column;

const TableCell = styled.td`
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: top;
  position: relative;
  width: 300px;
  padding-top: 20px;
  h3 {
    margin: 5px;
  }
`;

const TableHead = styled.thead`
  background-color: #fff;
`;

const TableRow = styled.tr`
  height: calc((100vh - 2em) / 5);
`;