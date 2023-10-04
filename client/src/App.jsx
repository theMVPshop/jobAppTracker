import styled, { ThemeProvider } from "styled-components";
import UploadFile from "./UploadFile";
import LandingDisplay from "./components/landing/LandingDisplay";

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

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <LandingDisplay />
        {/* <UploadFile /> */}
      </ThemeProvider>
    </>
  );
}

export default App;
