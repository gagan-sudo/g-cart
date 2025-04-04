import React from 'react'
import Layout from '../layout'
import { Container, Grid } from '@mui/material'
import {  useParams } from 'react-router-dom';
import { useGetSingleCategoryQuery } from '../services/categories';
import ProductCardForList from '../components/ProductCardForList';
import Loader from '../helper/Loader';

function ProductList() {
  const {category} = useParams()
  const { data, isLoading, error } = useGetSingleCategoryQuery({ category });
  // const navigate = useNavigate()
  if (isLoading) return <Loader />;
  if (error) return <>Error loading products</>;

  const products = data?.products || [];

  return (
    <Layout>
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