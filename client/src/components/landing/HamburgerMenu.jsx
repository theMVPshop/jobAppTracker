import styled from "styled-components";

const HamburgerMenu = ({ open }) => {
  return (
    <Menu open={open}>
      <div>
        <ul>
          <li>
            <ButtonEmpty>
              <p>Sign In</p>
            </ButtonEmpty>
          </li>
          <li>
            <ButtonEmpty>
              <p>Create Account</p>
            </ButtonEmpty>
          </li>
        </ul>
      </div>
    </Menu>
  );
};
export default HamburgerMenu;

const Menu = styled.div`
  display: ${({ open }) => (open ? "inline" : "none")};
  background-color: ${(props) => props.theme.colors.primaryBlue};
  width: 100%;
  margin-top: 50px;
  position: absolute;
  right: 0;
  div {
    margin: 0 50px;
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
`;

const ButtonEmpty = styled.button`
  position: relative;
  width: 100%;
  height: 50px;
  border-radius: ${(props) => props.theme.other.borderRadius};
  background-color: ${(props) => props.theme.colors.primaryWhite} !important;
  border: 1px solid ${(props) => props.theme.colors.primaryBlue};
  background-color: transparent;
  p {
    position: relative;
    z-index: 2;
    margin: 0px;
    font-size: 18px !important;
    color: ${(props) => props.theme.colors.primaryBlue};
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.colors.highlight1};
    width: 100%;
    height: 0;
    transition: all 0.3s;
  }
  &:hover {
    border: 1px solid ${(props) => props.theme.colors.highlight1};
    color: ${(props) => props.theme.colors.secondaryBlue} !important;
    cursor: pointer;
    &:before {
      height: 100%;
    }
  }
`;
