import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const Authentication = () => {
  // React hook to bring login, logout, and authentication checking capabilities.
  const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-qxzngmucus86xphq.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <>
      {
        // Checks if logged in to display logout button
        isAuthenticated ?
          <div>
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>
            <p>User Metadata: {JSON.stringify(userMetadata)}</p>
          </div>
          :
          <button onClick={loginWithRedirect}>Log In</button>
      }
    </>
  );
};

export default Authentication;