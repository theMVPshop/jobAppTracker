import styled from "styled-components";
import Authentication from "../Authentication";
import UploadResume from "../dashboard/UploadResume";
import { useAuth0 } from "@auth0/auth0-react";

const HamburgerMenu = ({ open }) => {
  const { isAuthenticated } = useAuth0();
  return (
    <Wrapper>
      <SubWrapper className={isAuthenticated ? "expanded" : "collapsed"}>
        <Menu open={open}>
          <div>
            <ul>
              <li>
                <Authentication />
              </li>
            </ul>
          </div>
        </Menu>
      </SubWrapper>
    </Wrapper>
  );
};
export default HamburgerMenu;

const Wrapper = styled.div`
  width: 100vw;
  position: absolute;
  display: flex;
  justify-content: center;
  top: 60px;
  left: 0;
  .collapsed {
    max-width: 1920px;
    margin: 0;
  }
  .expanded {
    max-width: 100%;
    margin: 0 40px;
    padding: 0;
  }
`;

const SubWrapper = styled.div`
  max-width: 1920px;
  width: 100%;
  margin: 0 100px;
  display: flex;
  justify-content: flex-end;
  @media only screen and (max-width: 700px) {
    margin: 0 !important;
  }
`;

const Menu = styled.div`
  display: ${({ open }) => (open ? "inline" : "none")};
  background-color: ${(props) => props.theme.colors.gray1};
  border: 1px solid ${(props) => props.theme.colors.gray2};
  border-radius: ${(props) => props.theme.other.borderRadius};
  z-index: 5;
  div {
    margin: 0 25px;
  }

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0;
    gap: 5px;
    width: 100%;
  }
  li {
    width: 100%;
  }
  @media only screen and (max-width: 700px) {
    width: 100%;
    margin: 0px 0;
  }
`;
