import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "@blueprintjs/core";
import HamburgerMenu from "./HamburgerMenu";
import Authentication from "../Authentication";
import AccountTile from "../../reusable/AccountTile";
import { useAuth0 } from "@auth0/auth0-react";

const LandingBar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth0();

  return (
    <Nav>
      <Container className={isAuthenticated ? "expanded" : "collapsed"}>
        <h1>Job App Tracker</h1>
        {!isAuthenticated && (
          <>
            <ButtonContainer>
              <Authentication />
            </ButtonContainer>
            <DropDown>
              <HamburgerMenu open={open} setOpen={setOpen} />
              <MenuButton open={open} onClick={() => setOpen(!open)}>
                <StyledIcon icon="menu" size={30} />
              </MenuButton>
            </DropDown>
          </>
        )}
        {isAuthenticated && (
          <ProfileDropdown>
            <HamburgerMenu open={open} setOpen={setOpen} />
            <MenuButton open={open} onClick={() => setOpen(!open)}>
              <AccountTile />
            </MenuButton>
          </ProfileDropdown>
        )}
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
  .collapsed {
    max-width: 1920px;
  }
  .expanded {
    max-width: 100%;
    padding: 25px;
  }
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
    font-size: 25px;
  }
  @media only screen and (max-width: 700px) {
    padding: 0 50px;
  }
`;

const DropDown = styled.div`
  display: none;
  @media only screen and (max-width: 1160px) {
    display: flex;
  }
`;

const ProfileDropdown = styled.div`
  display: flex;
  border-radius: ${(props) => props.theme.other.borderRadius};
  &:hover {
    background-color: ${(props) => props.theme.colors.gray1} !important;
    cursor: pointer;
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

const ButtonContainer = styled.div`
  position: relative;
  width: 180px;
  height: 40px;
  @media only screen and (max-width: 1160px) {
    display: none;
  }
`;
