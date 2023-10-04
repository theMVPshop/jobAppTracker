import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "@blueprintjs/core";
import ButtonFilled from "../../reusable/ButtonFilled";
import ButtonEmpty from "../../reusable/ButtonEmpty";
import HamburgerMenu from "./HamburgerMenu";

const LandingBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Nav>
      <Container>
        <h1>Job App Tracker</h1>
        <ButtonContainer>
          <ButtonFilled content={"Create Account"} />
          <ButtonEmpty content={"Sign in"} />
        </ButtonContainer>
        <DropDown>
          <HamburgerMenu open={open} setOpen={setOpen} />
          <MenuButton open={open} onClick={() => setOpen(!open)}>
            <StyledIcon icon="menu" size={30} />
          </MenuButton>
        </DropDown>
      </Container>
    </Nav>
  );
};

export default LandingBar;

const Nav = styled.div`
  font-family: ${(props) => props.theme.fonts.main};
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const Container = styled.div`
  max-width: 1920px;
  display: flex;
  width: 100%;
  height: 60px;
  padding: 0 100px;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  h1 {
    @media only screen and (max-width: 960px) {
      font-size: 25px;
    }
  }
  @media only screen and (max-width: 960px) {
    padding: 0 50px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  @media only screen and (max-width: 960px) {
    display: none;
  }
`;

const DropDown = styled.div`
  display: none;
  margin: 0 50px;
  @media only screen and (max-width: 960px) {
    display: flex;
  }
`;

const MenuButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.primaryBlue};
  display: flex;
  align-items: center;
`;
