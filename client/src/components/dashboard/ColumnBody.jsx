import styled from "styled-components";
import TileCard from "./TileCard";
import { useEffect, useState } from "react";

const ColumnBody = (props) => {
  const [color, setColor] = useState("#fff");
  const searchQuery = props.searchQuery;
  const column = props.column;

  useEffect(() => {
    if (column === "Rejected") {
      setColor("#F6F7F8");
    }
  }, [setColor, column]);

  return (
    <TableCell style={{ backgroundColor: color }}>
      {props.data
        .filter((card) => {
          if (searchQuery === "" || searchQuery === undefined) {
            return card;
          } else if (card.toLowerCase().includes(searchQuery.toLowerCase())) {
            return card;
          }
        })
        .map((card, index) => (
          <TileCard key={index} card={card} column={column} />
        ))}
    </TableCell>
  );
};
export default ColumnBody;

const TableCell = styled.td`
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: top;
  position: relative;
  width: 300px;
`;
