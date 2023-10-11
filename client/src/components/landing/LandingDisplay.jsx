import React from "react";
import styled from "styled-components";
import demoPc from "../../assets/demoPc.png";
import demoIpad from "../../assets/demoIpad.png";
import demoIphone from "../../assets/demoIphone.png";
import Authentication from "../Authentication";
import { useAuth0 } from "@auth0/auth0-react";

const LandingDisplay = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <ContentWrapper>
      <LandingPage>
        <Display>
          <Text>
            <div>
              <h1>
                Track, edit, and manage your job applications all in one place.
              </h1>
              <h4>
                No more unruly job search spreadsheets. Keep track of every
                detail about your job opportunities regardless of where you
                found them.
              </h4>
              <ButtonWrapper toggle={isAuthenticated}>
                <ButtonContainer>
                  <Authentication />
                </ButtonContainer>
              </ButtonWrapper>
            </div>
          </Text>
          <ImageStack>
            <DemoIpad src={demoIpad}></DemoIpad>
            <DemoIphone src={demoIphone}></DemoIphone>
          </ImageStack>
        </Display>
      </LandingPage>
    </ContentWrapper>
  );
};

export default LandingDisplay;

const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: ${(props) => props.theme.fonts.main};
  align-items: center;
`;

const LandingPage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Display = styled.div`
  display: flex;
  max-width: 1920px;
  width: 100%;
  height: 100%;
  padding: 300px 100px;
  background-image: url(${demoPc});
  background-repeat: no-repeat;
  background-position: top 150px right 0px;
  background-size: 1100px, auto, contain;
  @media only screen and (max-width: 2134px) {
    background-position: top 100px left calc(50vw + 150px);
    background-size: 900px, auto, contain;
    padding: 200px 100px;
    gap: 0;
  }
  @media only screen and (max-width: 1160px) {
    background-image: none;
    padding: 100px 100px;
    flex-direction: column;
    gap: 50px;
  }
  @media only screen and (max-width: 700px) {
    padding: 50px 50px;
  }
`;

const ImageStack = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 1160px) {
    position: initial;
    width: initial;
    height: initial;
  }
`;

const DemoIpad = styled.img`
  width: 80%;
  display: none;
  @media only screen and (max-width: 1160px) {
    display: block;
  }
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

const DemoIphone = styled.img`
  width: 80%;
  display: none;
  @media only screen and (max-width: 700px) {
    display: block;
  }
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  max-width: 960px;
  h1 {
    font-size: 50px;
    margin: 0 0 24px;
    @media only screen and (max-width: 960px) {
      font-size: 40px;
    }
  }
  h4 {
    font-size: 24px;
    margin: 0 0 24px;
    @media only screen and (max-width: 960px) {
      font-size: 20px;
    }
  }
  p {
    margin: 0;
    font-size: 18px;
    @media only screen and (max-width: 1160px) {
      text-align: center;
    }
  }
  div {
    @media only screen and (max-width: 2134px) {
      display: flex;
      flex-direction: column;
      /* width: 100%; */
    }
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  ${(props) => {
    if (!props.toggle) {
      return `
    display: none;
    `;
    } else {
      return `
        display: flex;
        width: 100%;
        @media only screen and (max-width: 1160px) {
          align-items: center;
        }
      `;
    }
  }}
`;

const ButtonContainer = styled.div`
  position: relative;
  width: 180px;
  height: 40px;
  @media only screen and (max-width: 1160px) {
    width: 480px;
  }
  @media only screen and (max-width: 700px) {
    width: 100%;
    height: 50px;
  }
`;
