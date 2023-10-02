import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Basic user information display
const Profile = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    console.log(error.message)
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        
      </div>
    )
  );
};

export default Profile;