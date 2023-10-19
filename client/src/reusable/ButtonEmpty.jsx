import styled from "styled-components";

const ButtonEmpty = (props) => {
  const { content } = props;
  return (
    <StyledButton onClick={props.handleClick}>
      <p>{props.content}</p>
    </StyledButton>
  );
};

export default ButtonEmpty;

const StyledButton = styled.button`
  position: relative;
  min-width: 180px;
  width: 90%;
  margin: 10px 0;
  height: 40px;
  border-radius: ${(props) => props.theme.other.borderRadius};
  background-color: transparent !important;
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
