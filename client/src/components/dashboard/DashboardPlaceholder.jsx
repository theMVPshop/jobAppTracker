import styled from "styled-components";

const DashboardPlaceholder = () => {
  return (
    <ContentWrapper>
      <h3>Dashboard Placeholder</h3>
      <p>under construction</p>
    </ContentWrapper>
  );
};

export default DashboardPlaceholder;

const ContentWrapper = styled.div`
  font-family: ${(props) => props.theme.fonts.main};
  display: flex;
  height: 600px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    margin: 0;
  }
`;
