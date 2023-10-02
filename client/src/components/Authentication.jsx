import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Authentication = () => {
    // React hook to bring login, logout, and authentication checking capabilities.
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    // Checks if logged in to display logout button
    if(isAuthenticated) {
        return (
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>
          );
    }
    //Checks if not logged in to display log in button
    else {
        return <button onClick={loginWithRedirect}>Log In</button>;
    }
};

export default Authentication;