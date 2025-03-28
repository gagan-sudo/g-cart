import React, {  useState } from "react";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, ThemeProvider, CssBaseline, Toolbar, Rating } from "@mui/material";
import { useGetProductsQuery } from "./services/product";
import ProductCardForList from "./components/ProductCardForList";
import Header from "./layout/TopBar";
import ThemeProviderWrapper from "./theme";
import { ToastContainer } from "react-toastify";
import Loader from "./helper/Loader";

const App = () => {

  const { data : products = [], error, isLoading } = useGetProductsQuery();
  const [darkMode, setDarkMode] = useState(false);
  console.log(products)

  if(error) return <>error</>

  if(isLoading) return <Loader/>

  return (
    <ThemeProviderWrapper darkMode={darkMode}>
      <ToastContainer theme={!darkMode ? "dark" : "light"}/>
      <CssBaseline />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Toolbar /> {/* Add toolbar spacing to prevent content overlap */}
      <Container>
        <Grid container spacing={3} mt={3} justifyContent="center">
          {products?.products.map((product,i) => (
           <ProductCardForList key={i} product={product} />
          ))}
        </Grid>
      </Container>
    </ThemeProviderWrapper>
  );
};

export default App;
