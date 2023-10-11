import styled from "styled-components";
import Authentication from "../Authentication";

const HamburgerMenu = ({ open }) => {
  return (
    <Menu open={open}>
      <div>
        <ul>
          <li>
            <Authentication />
          </li>
        </ul>
      </div>
    </Menu>
  );
};
export default HamburgerMenu;

const Menu = styled.div`
  display: ${({ open }) => (open ? "inline" : "none")};
  background-color: ${(props) => props.theme.colors.gray1};
  border: 1px solid ${(props) => props.theme.colors.gray2};
  border-radius: ${(props) => props.theme.other.borderRadius};
  width: 350px;
  margin: 50px 100px;
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
  @media only screen and (max-width: 700px) {
    width: 100%;
    margin: 50px 0;
  }
`;
