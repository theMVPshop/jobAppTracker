import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "@blueprintjs/core";

const Card = ({ data, onClick, onDelete }) => {
  const [tileColor, setTileColor] = useState();
  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const number = randomNumberInRange(0, 4);
  const colors = ["#0094FF", "#003B65", "#1F5B87", "#5495C3", "#0062A9"];

  useEffect(() => {
    const newColor = colors[number];
    if (data.status === "Rejected") {
      setTileColor("#CCCCCC");
    } else {
      setTileColor(newColor);
    }
  }, [colors, number]);

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
          <StarWrapper>
            <h4>{data.star_rating}</h4>
            <StyledIcon icon="star" size={15} />
          </StarWrapper>
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
