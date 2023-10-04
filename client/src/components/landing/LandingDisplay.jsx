import React from "react";
import styled from "styled-components";
import LandingBar from "./LandingBar";
import demo from "../../assets/demo.png";
import background from "../../assets/background.png";

const LandingDisplay = () => {
  return (
    <ContentWrapper>
      <LandingBar />
      <Display>
        <Text>
          <div>
            <h1>
              Track, Edit, and manage your job applications all in one place.
            </h1>
            <h4>
              No more unruly job search spreadsheets. Keep track of every detail
              about your job opportunities regardless of where you found them.
            </h4>
            <ButtonFilled>
              <p>Create Account</p>
            </ButtonFilled>
            <p>
              Already using Job App Tracker? <LinkButton>Sign in</LinkButton>
            </p>
          </div>
        </Text>
        <ImageStack>
          <div>
            <DemoImg1 src={demo}></DemoImg1>
            <DemoImg2 src={demo}></DemoImg2>
          </div>
        </ImageStack>
      </Display>
    </ContentWrapper>
  );
};

export default LandingDisplay;

const ContentWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: ${(props) => props.theme.fonts.main};
  align-items: center;
  /* background-image: url(${background});
  background-repeat: no-repeat;
  background-position: right;
  background-size: contain; */
  @media only screen and (max-width: 2134px) {
    height: initial;
  }
`;

const Display = styled.div`
  display: flex;
  max-width: 1920px;
  margin: 300px 100px;
  @media only screen and (max-width: 2134px) {
    flex-direction: column;
    margin: 200px 100px;
    gap: 50px;
    align-items: center;
  }
  @media only screen and (max-width: 1160px) {
    margin: 100px 100px;
    align-items: initial;
  }
  @media only screen and (max-width: 960px) {
    margin: 50px 50px;
  }
`;

const ImageStack = styled.div`
  div {
    width: 960px;
    /* height: 600px; */
    aspect-ratio: 5/3;
    position: relative;
    @media only screen and (max-width: 1160px) {
      width: 100%;
    }
  }
`;

const DemoImg1 = styled.img`
  width: 80%;
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: -5px 5px 5px 5px ${(props) => props.theme.colors.shadowColor};
  &:hover {
    z-index: 2;
  }
`;

const DemoImg2 = styled.img`
  width: 80%;
  position: absolute;
  bottom: 0;
  left: 0;
  box-shadow: -5px 5px 5px 5px ${(props) => props.theme.colors.shadowColor};
  &:hover {
    z-index: 2;
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
  }
  div {
    @media only screen and (max-width: 2134px) {
      display: flex;
      flex-direction: column;
      width: fit-content;
    }
  }
`;

const LinkButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: ${(props) => props.theme.colors.primaryBlue};
  text-decoration: underline;
  &:hover {
    color: ${(props) => props.theme.colors.secondaryBlue};
    cursor: pointer;
  }
`;

const ButtonFilled = styled.button`
  position: relative;
  width: 180px;
  height: 40px;
  margin: 0 0 24px;
  border-radius: ${(props) => props.theme.other.borderRadius};
  background-color: ${(props) => props.theme.colors.primaryBlue} !important;
  border: 1px solid ${(props) => props.theme.colors.primaryBlue};
  background-color: transparent;
  p {
    position: relative;
    z-index: 2;
    margin: 0px;
    font-size: 18px !important;
    color: ${(props) => props.theme.colors.primaryWhite};
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${(props) => props.theme.colors.secondaryBlue};
    width: 0px;
    height: 100%;
    transition: all 0.3s;
  }
  &:hover {
    &:before {
      width: 100%;
    }
    border: 1px solid ${(props) => props.theme.colors.secondaryBlue};
    color: ${(props) => props.theme.colors.primaryWhite} !important;
    cursor: pointer;
  }
  @media only screen and (max-width: 2134px) {
    width: 480px;
    height: 50px;
  }
  @media only screen and (max-width: 960px) {
    width: 100%;
    height: 50px;
  }
`;
