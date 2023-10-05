import styled, { ThemeProvider } from "styled-components";
import UploadFile from "./UploadFile";
import LandingDisplay from "./components/landing/LandingDisplay";
//import './App.css'
import { Auth0Provider } from "@auth0/auth0-react";
import Profile from "./components/Profile";
import Authentication from "./components/Authentication";

const theme = {
  colors: {
    primaryWhite: "#fff",
    primaryBlue: "#0094ff",
    secondaryBlue: "#1975f7",
    highlight1: "#dfeafa",
    shadowColor: "#888888",
  },
  fonts: {
    main: "Roboto",
  },
  other: {
    borderRadius: "5px",
  },
};

//Use Example:
//font-family: ${(props) => props.theme.fonts.main}

/* Auth0Provider needs to wrap around the entire application, based on recommendation from Auth0 */

function App() {
  return (
    <Auth0Provider
      domain="dev-qxzngmucus86xphq.us.auth0.com"
      clientId="s6f9hSpUxFolZsfQ7sNhD9JIO2s39fYl"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <ThemeProvider theme={theme}>
        <LandingDisplay />
        <Authentication />
        <Profile />
        <UploadFile />
      </ThemeProvider>
    </Auth0Provider>
  );
}

export default App;
