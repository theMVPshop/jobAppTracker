import styled from "styled-components";

const ButtonFilled = (props) => {
  const { content } = props;
  return (
    <StyledButton onClick={props.handleClick}>
      <p>{props.content}</p>
    </StyledButton>
  );
};

export default ButtonFilled;

const StyledButton = styled.button`
  position: relative;
  /* width: 180px; */
  width: 100%;
  min-width: 180px;
  height: 40px;
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
`;
