import React, {  useState } from "react";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, ThemeProvider, CssBaseline, Toolbar, Rating } from "@mui/material";
import { useGetProductsQuery } from "./services/product";
import ProductCardForList from "./components/ProductCardForList";
import Header from "./layout/TopBar";
import ThemeProviderWrapper from "./theme";
import { ToastContainer } from "react-toastify";
import Loader from "./helper/Loader";
import Banner from "./components/Banner";
import HomePage from "./pages/HomePage";
import Routes from "./routes";
import { RouterProvider } from "react-router-dom";
import { useThemeMode } from "./hooks/useThemeMode";
import ThemeModeProvider from "./context/ThemeModeContext";
import Layout from "./layout";

const App = () => {

  // const { data : products = [], error, isLoading } = useGetProductsQuery();
    const {darkMode,setDarkMode} =  useThemeMode()
  
 

  // if(error) return <>error</>
// 
  // if(isLoading) return <Loader/>

  return (
    
    <ThemeProviderWrapper darkMode={darkMode}>
      <ToastContainer theme={darkMode ? "dark" : "light"}/>
      <CssBaseline />
      

      {/* Add toolbar spacing to prevent content overlap */}
      <RouterProvider router={Routes} />
     
    </ThemeProviderWrapper>
  );
};

export default App;
