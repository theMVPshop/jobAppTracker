import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonFilled from "../reusable/ButtonFilled";

const Authentication = (buttonType) => {
  // React hook to bring login, logout, and authentication checking capabilities.
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  // Checks if logged in to display logout button
  if (isAuthenticated) {
    console.log(isAuthenticated);
    return (
      <ButtonFilled
        content={"Log out"}
        handleClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      />
    );
  }
  //Checks if not logged in to display log in button
  else {
    console.log(isAuthenticated);
    return <ButtonFilled content={"Sign in"} handleClick={loginWithRedirect} />;
  }
};

export default Authentication;
