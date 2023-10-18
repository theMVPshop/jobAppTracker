import styled from "styled-components";
import ButtonEmpty from "../../reusable/ButtonEmpty";
import { useEffect, useState } from "react";

const ColumnHead = (props) => {
  const handlePlusClick = props.handlePlusClick;
  const [color, setColor] = useState("#fff");

  useEffect(() => {
    if (props.column === "Rejected") {
      setColor("#F6F7F8");
    }
  }, [setColor, props.column]);
  return (
    <TableCell style={{ backgroundColor: color }}>
      <div>
        <h3>{props.column}</h3>
      </div>
      <div>
        <ButtonEmpty content="+" handleClick={handlePlusClick} />
      </div>
    </TableCell>
  );
};

export default ColumnHead;

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
