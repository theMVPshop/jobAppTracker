import styled from "styled-components";
import Authentication from "../Authentication";

const HamburgerMenu = ({ open }) => {
  return (
    <Wrapper>
      <SubWrapper>
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
`;

const SubWrapper = styled.div`
  max-width: 1920px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Menu = styled.div`
  display: ${({ open }) => (open ? "inline" : "none")};
  background-color: ${(props) => props.theme.colors.gray1};
  border: 1px solid ${(props) => props.theme.colors.gray2};
  border-radius: ${(props) => props.theme.other.borderRadius};
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
