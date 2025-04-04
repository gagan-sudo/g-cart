import React from 'react'
import Layout from '../layout'
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../services/product';
import Loader from '../helper/Loader';
import ProductDetail from '../components/ProductDetail';

function Product() {

  const {id} = useParams()
  const { data, isLoading, error } = useGetProductByIdQuery({ id });
  if (isLoading) return <Loader />;
  if (error) return <>Error loading products</>;

  console.log(data,"data--")

  return (
    <Layout>
      <ProductDetail product={data} />
    </Layout>
  )
}

export default Product