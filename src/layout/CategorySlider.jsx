import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, useTheme } from '@mui/material';
import { useGetCategoriesListQuery } from '../services/categories';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

const CategorySlider = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const { data: categories = [] } = useGetCategoriesListQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    variableWidth: true, // Allows slides to dynamically adjust their width
    centerMode: false, // Disable centering so slides fit naturally
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 400, settings: { slidesToShow: 1 } },
    ],
  };
  
  
  
  return (
    <Box
      sx={{
        padding: '25px',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Slider {...settings}>
        {categories.map((category, index) => (
          <Box
            key={index}
            sx={{
              padding: '8px',
              textAlign: 'center',
              borderRadius: '50%',
            }}
          >
            <Typography sx={{
                ":hover":{
                    cursor:'pointer'
                }
            }} onClick={()=>navigate(`/${category}`)} color="primary" variant="h5">{category.toUpperCase()}</Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CategorySlider;
