import { Brightness4, Brightness7, Close, Menu } from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import logo from "../assets/logo.png";
import { showToast, showError } from "../helper/toast";

function Header({ darkMode, setDarkMode }) {
  const theme = useTheme();
  const [toggleState,setToggleState] = useState(false)
  
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    showToast(`Switched to ${darkMode ? "Light" : "Dark"} Mode`);
  };
  const handleToggleState = () => {
        setToggleState(!toggleState)
  }

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            sx={{ display: { xs: "block", sm: "block", md: "none" },color:theme.palette.secondary.dark }}
            onClick={handleToggleState}
          >
           { !toggleState?<Menu />:<Close/>}
          </IconButton>
          {window.innerWidth < 960 ? null : (
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <img
                src={logo}
                alt="GreenCart Logo"
                style={{ height: "40px", width: "auto", marginLeft: "10px" }}
              />
              <Typography
                variant="h6"
                align="center"
                sx={{ flexGrow: 1, marginLeft: "10px" }}
              >
                GreenCart
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button sx={{color:theme.palette.primary.light,bgcolor:theme.palette.secondary.dark}} onClick={() => showError("You can't login")}>
            Login
          </Button>
          <IconButton onClick={handleThemeToggle} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
