import styled from "styled-components";
import TileCard from "./TileCard";

const ColumnBody = (props) => {
  const searchQuery = props.searchQuery;

  return (
    <TableCell>
      {props.data
        .filter((card) => {
          if (searchQuery === "" || searchQuery === undefined) {
            return card;
          } else if (card.toLowerCase().includes(searchQuery.toLowerCase())) {
            return card;
          }
        })
        .map((card, index) => (
          <TileCard key={index} card={card} />
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
