import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingDisplay from "./components/landing/LandingDisplay";
import { Auth0Provider } from "@auth0/auth0-react";
import Dashboard from "./components/dashboard/Dashboard";
import LandingBar from "./components/Landing/LandingBar";
import AuthenticationGuard from "./components/AuthenticationGuard";
import UpdateJobs from "./UpdateJobs";
import UploadFile from "./UploadFile";
import { useState } from "react";

//Theme Use Example:
//font-family: ${(props) => props.theme.fonts.main}

export const toTitleCase = (str) => {
  return str
    .replace(/([a-z\d])([A-Z]+)/g, "$1_$2")
    .replace(/_/g, " ")
    .replace(/\b./g, (char) => char.toUpperCase());
};

export const columnsData = [
  {
    title: "Rejected",
    data: [],
  },
  {
    title: "Applied",
    data: [],
  },
  {
    title: "Phone",
    data: [],
  },
  {
    title: "Onsite",
    data: [],
  },
  {
    title: "Offer",
    data: [],
  },
];

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

export class Job {
  constructor({
    id = null,
    gpt_rating = null,
    gpt_analysis = null,
    description = null,
    status = null,
    date_applied = null,
    company_name = null,
    position_title = null,
    location = null,
    job_type = null,
    salary = null,
    qualifications = null,
    responsibilities = null,
    skills = null,
    education = null,
  } = {}) {
    this.id = id;
    this.gpt_rating = gpt_rating;
    this.gpt_analysis = gpt_analysis;
    this.description = description;
    this.status = status;
    this.date_applied = date_applied;
    this.company_name = company_name;
    this.position_title = position_title;
    this.location = location;
    this.job_type = job_type;
    this.salary = salary;
    this.qualifications = qualifications;
    this.responsibilities = responsibilities;
    this.skills = skills;
    this.education = education;
  }
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Auth0Provider
      domain="dev-qxzngmucus86xphq.us.auth0.com"
      clientId="s6f9hSpUxFolZsfQ7sNhD9JIO2s39fYl"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/dashboard`,
        audience: "https://dev-qxzngmucus86xphq.us.auth0.com/api/v2/",
        scope:
          "read:current_user update:current_user_metadata openid profile email",
      }}
      useRefreshTokens={true}
    >
      <ThemeProvider theme={theme}>
        <Router>
          <LandingBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Routes>
            <Route path="/" element={<LandingDisplay />} />
            <Route
              path="/dashboard"
              element={
                <AuthenticationGuard
                  component={Dashboard}
                  searchQuery={searchQuery}
                  initialData={columnsData}
                />
              }
            />

            <Route path="/applications" element={<UpdateJobs />} />

            <Route path="/resume" element={<UploadFile />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Auth0Provider>
  );
}

export default App;
