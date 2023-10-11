import styled, { keyframes } from "styled-components";

const PageLoader = () => {
  return (
    <PageWrapper>
      <LoadingWrapper>
        <h3>Loading</h3>
        <Dot delay="0s" />
        <Dot delay="0.1s" />
        <Dot delay="0.2s" />
      </LoadingWrapper>
    </PageWrapper>
  );
};
export default PageLoader;

const BounceAnimation = keyframes`
  0% { 
    margin-bottom: 0; 
  }

  50% { 
    margin-bottom: 1rem;
  }

  100% { 
    margin-bottom: 0;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  h3 {
    margin: 0;
    padding: 0;
  }
`;

const Dot = styled.div`
  background-color: black;
  border-radius: 50%;
  width: 4px;
  height: 4px;
  margin: 0 2px;
  /*Animation*/
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`;
