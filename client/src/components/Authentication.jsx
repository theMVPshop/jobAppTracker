import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import ButtonFilled from "../reusable/ButtonFilled";

const Authentication = () => {
  // React hook to bring login, logout, and authentication checking capabilities.
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
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

        // function that will send uuid to backend
        const postData = {
          parcel: user?.sub,
        };

        // POST request
        fetch('http://localhost:3000/api/uuid/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
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
        isAuthenticated ? (
          <div>
            <ButtonFilled
              content={"Log out"}
              handleClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            />
            {/* <p>User Metadata: {JSON.stringify(userMetadata)}</p> */}
          </div>
        ) : (
          <ButtonFilled content={"Sign in"} handleClick={loginWithRedirect} />
        )
      }
    </>
  );
};

export default Authentication;
