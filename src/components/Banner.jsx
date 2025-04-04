import Slider from 'react-slick';
import { Box, CardMedia, Rating, Typography, useTheme } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {  useGetProductsQuery } from '../services/product';
import BannerImage from '../assets/banner.png'

const bannerArray=[BannerImage,BannerImage]


const Banner = () => {
  const theme = useTheme();
  const {data : products } = useGetProductsQuery()
  

  console.log(products)

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    cssEase: "ease-in-out",
    // variableWidth: true, // Allows slides to dynamically adjust their width
    centerMode: false, // Disable centering so slides fit naturally
    appendDots: dots => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // padding: "10px",
            paddingTop:'10px'
          }}
        >
          <ul style={{ display: "flex", gap: "8px", padding: 0 }}>{dots}</ul>
        </Box>
      ),
    customPaging: i => (
        <Box
          sx={{
            width: "10px",
            height: "10px",
            marginTop: '25px',
            backgroundColor: theme.palette.primary.main,
            borderRadius: "50%",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
            },
            
          }}
        />
      ),
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 1 } },
      { breakpoint: 900, settings: { slidesToShow: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
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
        {/* {bannerArray.map((item, index) => ( */}
        {products?.products.slice(25,30).map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: '8px',
              textAlign: 'center',
              borderRadius: '50%',
            }}
          >
            <CardMedia

            image={item?.images[0]}
            sx={{

                height:250,
                width:'100%',
                ":hover":{
                    cursor:'pointer'
                }
            }}
           />
            {/* <Typography sx={{
                ":hover":{
                    cursor:'pointer'
                }
            }} onClick={()=>showToast(`${item.title}`)} color="primary" variant="h5">{item.title}</Typography> */}
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Banner;
