import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "@blueprintjs/core";

const Card = ({ data, onClick, onDelete }) => {
  const [tileColor, setTileColor] = useState();
  const colors = ["#999999", "#C9463C", "#DF8E25", "#C6B346", "#35AB64", "#3CA3DA"];

  useEffect(() => {
    if (data.status === "Rejected") {
      setTileColor("#CCCCCC");
    } else if (data.gpt_rating) {
      setTileColor(colors[data.gpt_rating]);
    }
    else {
      setTileColor(colors[0]);
    }
  }, [data]);

  return (
    <InfoCard
      onClick={onClick}
      style={{
        backgroundColor: tileColor,
      }}
    >
      <ContentWrapper>
        <div>
          <h3>{data.position_title}</h3>
          <p>{data.company_name}</p>
          <p>{new Date(data.date_applied).toLocaleDateString()}</p>
        </div>

        <RightWrapper>
          <StyledCross
            icon="cross"
            size={15}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(data.id);
            }}
          />
          {data.gpt_rating &&
            <StarWrapper>
              <h4>{data.gpt_rating}</h4>
              <StyledIcon icon="star" size={15} />
            </StarWrapper>
          }
        </RightWrapper>
      </ContentWrapper>
    </InfoCard>
  );
};

export default Card;

const InfoCard = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  margin: 10px auto;
  width: 90%;
  height: 100px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 100%;
  text-align: left;
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: 15px;
      margin: 5px 0;
    }
    p {
      font-size: 12px;
      margin: 5px 0;
    }
  }
`;

const StyledIcon = styled(Icon)`
  fill: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 5px;
  margin: 5px 0;
`;

const StyledCross = styled(Icon)`
  fill: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 5px;
  margin: 5px 0;
  :hover {
    fill: red;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
  p {
    margin: 0;
  }
`;

const StarWrapper = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: center;
  align-items: center;
  h4 {
    margin: 5px 0;
  }
`;
