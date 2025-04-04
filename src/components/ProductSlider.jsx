import React, { useRef } from 'react';
import Slider from 'react-slick';
import { Box, Button, Typography, useTheme, IconButton } from '@mui/material';
import ProductCardForList from './ProductCardForList';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useGetSingleCategoryQuery } from '../services/categories';
import Loader from '../helper/Loader';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const ProductSlider = ({ category = "vehicle" }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const { data, isLoading, error } = useGetSingleCategoryQuery({ category });

  if (isLoading) return <Loader />;
  if (error) return <>Error loading products</>;

  const products = data?.products || [];
  const slidesToShow = Math.min(4, products.length);
  

  const settings = {
    dots: false,
    arrows: false, // Hide default arrows
    infinite: products.length > slidesToShow,
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
        // backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Category Heading with Custom Arrows */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Button onClick={() => navigate(`/${category}`)} sx={{ textTransform: 'capitalize' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{category}</Typography>
        </Button>

        {/* Custom Slider Controls */}
        <Box>
          <IconButton onClick={() => sliderRef.current?.slickPrev()} sx={{ color: theme.palette.primary.main, mx: 1 }}>
            <ArrowBackIos />
          </IconButton>
          <IconButton onClick={() => sliderRef.current?.slickNext()} sx={{ color: theme.palette.primary.main }}>
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Box>

      {products.length > 0 ? (
        <Slider ref={sliderRef} {...settings}>
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
