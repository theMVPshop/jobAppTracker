import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

// Basic user information display
const AccountTile = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();

  let username = user.nickname;

  if (!user.nickname) {
    username = user.name;
  }
  if (!user.nickname) {
    username = user.email;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    console.log(error.message);
  }

  return (
    isAuthenticated && (
      <Wrapper>
        <h3>{username}</h3>
        <img src={user.picture} alt={user.name} />
      </Wrapper>
    )
  );
};

export default AccountTile;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  h3 {
    font-family: ${(props) => props.theme.fonts.main};
    @media only screen and (max-width: 700px) {
      display: none;
    }
  }
  img {
    height: 40px;
    border-radius: 999px;
  }
`;
