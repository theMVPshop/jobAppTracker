import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingDisplay from "./components/landing/LandingDisplay";
import { Auth0Provider } from "@auth0/auth0-react";
import DashboardPlaceholder from "./components/dashboard/DashboardPlaceholder";
import LandingBar from "./components/landing/LandingBar";
import AuthenticationGuard from "./components/AuthenticationGuard";

//Theme Use Example:
//font-family: ${(props) => props.theme.fonts.main}

const theme = {
  colors: {
    primaryWhite: "#fff",
    primaryBlue: "#0094ff",
    secondaryBlue: "#1975f7",
    highlight1: "#dfeafa",
    gray1: "#F6F7F8",
    gray2: "#CCCCCC",
  },
  fonts: {
    main: "Roboto",
  },
  other: {
    borderRadius: "5px",
  },
};

/* Auth0Provider needs to wrap around the entire application, based on recommendation from Auth0 */

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_REACT_APP_DOMAIN_ID}
      clientId={import.meta.env.VITE_REACT_APP_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ThemeProvider theme={theme}>
        <Router>
          <LandingBar />
          <Routes>
            <Route path="/" element={<LandingDisplay />} />
            <Route
              path="/dashboard"
              element={<AuthenticationGuard component={DashboardPlaceholder} />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </Auth0Provider>
  );
}

export default App;
