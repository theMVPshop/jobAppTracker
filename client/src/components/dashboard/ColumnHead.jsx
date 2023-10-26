import styled from "styled-components";
import ButtonEmpty from "../../reusable/ButtonEmpty";
import { useEffect, useState } from "react";

const ColumnHead = ({ title, handlePlusClick }) => {
  const [color, setColor] = useState("#fff");

  useEffect(() => {
    if (title === "Rejected") {
      setColor("#F6F7F8");
    }
  }, [setColor, title]);
  return (
    <TableCell style={{ backgroundColor: color }}>
      <div>
        <h3>{title}</h3>
      </div>
      <ButtonWrap>
        <BtnCont>
          <ButtonEmpty content="+" handleClick={() => handlePlusClick(title)} />
        </BtnCont>
      </ButtonWrap>
    </TableCell>
  );
};

export default ColumnHead;

const TableCell = styled.td`
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: top;
  position: relative;
  width: 370px;
  min-width: 370px;
  padding-top: 20px;
  h3 {
    margin: 5px;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 12px 0;
`;

const BtnCont = styled.div`
  width: 90%;
`;
