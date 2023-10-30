import styled from "styled-components";
import ButtonEmpty from "../../reusable/ButtonEmpty";
import { useEffect, useState } from "react";
import { Icon } from "@blueprintjs/core";

const ColumnHead = ({ title, data, icons, handlePlusClick }) => {
  const [color, setColor] = useState("#fff");

  useEffect(() => {
    if (title === "Rejected") {
      setColor("#F6F7F8");
    }
  }, [setColor, title]);
  return (
    <TableCell style={{ backgroundColor: color }}>
      <HeadWrap>
        <StyledIcon icon={icons} size={25} />
        <div>
          <h3>{title}</h3>
          <h4>Jobs: {data.length}</h4>
        </div>
      </HeadWrap>
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
  border: 1px solid ${(props) => props.theme.colors.gray2};
  text-align: center;
  vertical-align: top;
  position: relative;
  width: 288px;
  min-width: 288px;
  padding-top: 20px;
  z-index: 1;
  @media only screen and (max-width: 700px) {
    width: calc(100vw - 54px);
  }
  h3 {
    margin: 5px;
  }
  h4 {
    color: gray;
    margin: 5px;
  }
`;

const HeadWrap = styled.div`
  position: relative;
  right: 15px;
  display: flex;
  width: 100%;
  justify-content: center;
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

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.secondaryBlue};
  position: relative;
  right: 20px;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 5px;
  margin: 5px 0;
`;
