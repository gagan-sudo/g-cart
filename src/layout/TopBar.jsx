import { Brightness4, Brightness7 } from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import logo from "../assets/logo.png";
import { showToast } from "../helper/toast";
import CategoryList from "./CategoryList";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

function Header({ darkMode, setDarkMode }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    showToast(`Switched to ${darkMode ? "Light" : "Dark"} Mode`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showToast("Logged out successfully");
      setAnchorEl(null);
      navigate('/')
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({
          name: user.displayName || user.email,
          email: user.email,
          photo: user.photoURL,
        });
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  console.log(userData)

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box display="flex" alignItems="center">
              <img
                src={logo}
                onClick={() => navigate("/")}
                alt="GreenCart Logo"
                style={{ height: "40px", width: "auto", marginLeft: "10px", cursor: "pointer" }}
              />
              <Typography
                variant="h6"
                color={"secondary.dark"}
                onClick={() => navigate("/")}
                sx={{ marginLeft: "10px", cursor: "pointer" }}
              >
                GreenCart
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {userData ? (
              <>
                <Tooltip title="Account settings">
                  <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                    <Avatar  alt={userData.name} src={userData.photo} >{userData.name.slice(0,1).toUpperCase()}</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem disabled>{userData.name}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                sx={{ color: theme.palette.primary.light, bgcolor: theme.palette.secondary.dark, '&:hover': { bgcolor: theme.palette.secondary.main } }}
                onClick={() => navigate("/auth/signin")}
              >
                Login
              </Button>
            )}
            <IconButton onClick={handleThemeToggle} color="inherit">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <CategoryList />
    </>
  );
}

export default Header;
