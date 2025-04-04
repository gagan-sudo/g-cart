import React from 'react'
import Layout from '../layout'
import { Box, Button, Container, Grid } from '@mui/material'
import {  useNavigate, useParams } from 'react-router-dom';
import { useGetSingleCategoryQuery } from '../services/categories';
import ProductCardForList from '../components/ProductCardForList';
import Loader from '../helper/Loader';

function ProductList() {
  const {category} = useParams()
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetSingleCategoryQuery({ category });
  // const navigate = useNavigate()
  if (isLoading) return <Loader />;
  if (error) return <>Error loading products</>;

  const products = data?.products || [];

  return (
    <Layout>
       {/* <Box sx={{justifySelf:'end' ,}}> */}
     <Button sx={{position:'fixed',right:15,top:75,zIndex:5000}} variant="contained" color="primary" onClick={()=>navigate(-1)} >
             Back
           </Button>
      {/* </Box> */}
      <Container>
       <Grid container spacing={3} mt={3} justifyContent="center">
          {products?.map((product,i) => (
           <ProductCardForList key={i} product={product} />
          ))}
        </Grid>
        </Container>
    </Layout>
  )
}

export default ProductList