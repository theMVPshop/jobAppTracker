import styled from "styled-components";
import ButtonEmpty from "../../reusable/ButtonEmpty";

const ColumnHead = (props) => {
  const handlePlusClick = props.handlePlusClick;
  return (
    <TableCell>
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
