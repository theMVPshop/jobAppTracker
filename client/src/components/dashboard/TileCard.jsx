import styled from "styled-components";
import { Icon } from "@blueprintjs/core";
import { useEffect, useState } from "react";

const TileCard = (props) => {
  const [tileColor, setTileColor] = useState();

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const number = randomNumberInRange(0, 4);
  const colors = ["#0094FF", "#003B65", "#1F5B87", "#5495C3", "#0062A9"];

  useEffect(() => {
    const newColor = colors[number];
    setTileColor(newColor);
  }, [colors, number]);

  return (
    <InfoCard key={props.index} style={{ backgroundColor: tileColor }}>
      <ContentWrapper>
        <div>
          <h4>{props.card}</h4>
          <h5>Company</h5>
          <h6>mm/dd/yyyy</h6>
        </div>
        <RightWrapper>
          <p>...</p>
          <StarWrapper>
            <h4>5</h4>
            <StyledIcon icon="star" size={15} />
          </StarWrapper>
        </RightWrapper>
      </ContentWrapper>
    </InfoCard>
  );
};

export default TileCard;

const InfoCard = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  margin: 10px auto;
  width: 90%;
  height: 80px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  h4 {
    margin: 5px 0;
  }
  h5 {
    margin: 5px 0;
  }
  h6 {
    margin: 5px 0;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 100%;
  text-align: left;
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const StyledIcon = styled(Icon)`
  fill: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 5px;
  margin-bottom: 2px;
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
