import React from "react";
import styled from "styled-components";

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  flex-grow: 1;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f0f0f0;
`;

const TableRow = styled.tr`
  height: calc((100vh - 2em) / 5);
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: top;
`;

const InfoCard = styled.div`
  padding: 10px;
  margin: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PlusButton = styled.button`
  position: relative;
  bottom: 1px;
  right: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  margin: 10px;
`;

const StandardTable = ({ headers, data, onPlusClick }) => {
  return (
    <DashboardWrapper>
      <StyledTable>
        <TableHead>
          <tr>
            {headers.map((header, index) => (
              <TableCell key={index}>
                <div>{header}</div>
                <div>
                  <PlusButton onClick={() => onPlusClick(header.toLowerCase())}>
                    +
                  </PlusButton>
                </div>
              </TableCell>
            ))}
          </tr>
        </TableHead>
        <tbody>
          <TableRow>
            {data.map((rowData, rowIndex) => (
              <TableCell key={rowIndex}>
                {rowData.map((info, infoIndex) => (
                  <InfoCard key={infoIndex}>{info}</InfoCard>
                ))}
              </TableCell>
            ))}
          </TableRow>
        </tbody>
      </StyledTable>
    </DashboardWrapper>
  );
};

export default StandardTable;
