import React from 'react';
import Slider from 'react-slick';
import { Box, Button, Typography, useTheme } from '@mui/material';
import ProductCardForList from './ProductCardForList'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useGetSingleCategoryQuery } from '../services/categories';
import Loader from '../helper/Loader';
import { useNavigate } from 'react-router-dom';

const ProductSlider = ({ category = "vehicle" }) => {
  const theme = useTheme();
  const { data, isLoading, error } = useGetSingleCategoryQuery({ category });
  const navigate = useNavigate()
  if (isLoading) return <Loader />;
  if (error) return <>Error loading products</>;

  const products = data?.products || []; // Ensure products is always an array

  // Dynamically set slidesToShow based on available products
  const slidesToShow = Math.min(4, products.length);

  const settings = {
    dots: false,
    infinite: products.length > slidesToShow, // Prevent infinite loop if products are fewer
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    cssEase: 'ease-in-out',
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: Math.min(3, products.length) } },
      { breakpoint: 900, settings: { slidesToShow: Math.min(2, products.length) } },
      { breakpoint: 600, settings: { slidesToShow: Math.min(1, products.length) } },
    ],
  };

  return (
    <Box
      sx={{
        padding: '25px',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Category Heading */}
      <Box>
        <Button onClick={()=>navigate(`/${category}`)} >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textTransform: 'capitalize' }}  >
        {category}
      </Typography>
      </Button>
      </Box>

      {products.length > 0 ? (
        <Slider {...settings}>
          {products.map((product) => (
            <Box key={product.id} sx={{ padding: '8px' }}>
              <ProductCardForList product={product} />
            </Box>
          ))}
        </Slider>
      ) : (
        <Typography variant="body1">No products available</Typography>
      )}
    </Box>
  );
};

export default ProductSlider;
