import { Brightness4, Brightness7, Close, Menu } from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import logo from "../assets/logo.png";
import { showToast, showError } from "../helper/toast";
import { useGetCategoriesListQuery } from "../services/categories";
import CategorySlider from "./CategorySlider";
import { useNavigate } from "react-router-dom";
import CategoryList from "./CategoryList";

function Header({ darkMode, setDarkMode }) {
  const theme = useTheme();
  const [toggleState,setToggleState] = useState(false)
  const {data} = useGetCategoriesListQuery()
  const navigate = useNavigate()
  
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    showToast(`Switched to ${darkMode ? "Light" : "Dark"} Mode`);
  };
  // const handleToggleState = () => {
  //       setToggleState(!toggleState)
  // }

  // console.log(data)

  return (
    <>
    <AppBar position="fixed" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <IconButton
            edge="start"
            sx={{ display: { xs: "block", sm: "block", md: "none" },color:theme.palette.secondary.dark }}
            onClick={handleToggleState}
          >
           { !toggleState?<Menu />:<Close/>}
          </IconButton> */}
          {/* {window.innerWidth < 960 ? null : 
          ( */}
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{
             
            }} >
              <img
                src={logo}
                onClick={()=>navigate('/')}
                alt="GreenCart Logo"
                style={{ height: "40px", width: "auto", marginLeft: "10px",cursor:'pointer' }}
              />
              <Typography
                variant="h6"
                align="center"
                onClick={()=>navigate('/')}
                sx={{ flexGrow: 1, marginLeft: "10px", ":hover":{
                  cursor:'pointer'
                } }}
              >
                GreenCart
              </Typography>
            </Box>
          {/* // )} */}
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
    <Toolbar/>
    <CategoryList/>
    {/* <CategorySlider/> */}
    </>
  );
}

export default Header;
