import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeProviderWrapper = ({ darkMode, children }) => {
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#32CD32" : "#064420", // Light Green in Dark Mode, Dark Green in Light Mode
        dark: "#32CD32",
        light: "#064420",
      },
      secondary: {
        main: darkMode ? "#FFD700" : "#D4A017", // Dark Yellow in Dark Mode, Stronger Yellow in Light Mode
        dark: "#FFD700",
        light: "#D4A017",
      },
      background: {
        default: darkMode ? "#181818" : "#FFFFFF",
        paper: darkMode ? "#242424" : "#FAFAFA",
        dark: "#181818",
        light: "#FFFFFF",
      },
      text: {
        primary: darkMode ? "#E0E0E0" : "#064420",
        secondary: darkMode ? "#A0A0A0" : "#555555", // Improved contrast for light mode
        dark: "#E0E0E0",
        light: "#064420",
      },
      error: {
        main: "#FF0000", // Red color for discounts
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
