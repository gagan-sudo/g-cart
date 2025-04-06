import { Box, Button, Card, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Importing cart icon
import VisibilityIcon from '@mui/icons-material/Visibility'; // Importing view icon
import { IconButton } from '@mui/material'; // Importing IconButton for icons
import { showToast } from '../helper/toast';

function ProductCardForList({ product }) {
  const theme = useTheme();
  const navigate = useNavigate()

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={4} key={product.id}> {/* Increased width for xl devices */}
    <Card 
  sx={{ 
    display: 'flex', 
    flexDirection: 'column', 
    height: '100%', 
    width: '100%', 
    backgroundColor: theme.palette.background.paper, 
    color: theme.palette.text.primary 
  }}
>
  {/* Added a Box wrapper to control overflow and apply hover effects */}
  <Box 
    sx={{ 
      overflow: 'hidden',  // Prevents the image from overflowing
      width: '100%', 
      height: '200px',
      '&:hover img': { 
        transform: 'scale(1.1)',  // Zoom effect on hover
        transition: 'transform 0.3s ease-in-out' // Smooth transition
      }
    }}
  >
    <CardMedia
      component="img"
      sx={{ 
        cursor: 'pointer', 
        width: "100%", 
        height: "100%", 
        objectFit: "cover", 
        backgroundColor: theme.palette.background.default, 
        transition: 'transform 0.3s ease-in-out' // Ensures smooth scaling effect
      }}
      image={product.images[0]}
      alt={product.title}
      onClick={() => navigate(`/product/${product?.id}`)}
    />
  </Box>

  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <Typography variant="h6" gutterBottom color="primary">
      {product.title}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      {product.description.substring(0, 50)}...
    </Typography>
    <Rating name="read-only" value={product.rating || 0} precision={0.5} readOnly />
    <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
      ${product.price}
    </Typography>
    <Box 
  sx={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: '10px' 
  }}
>
  {/* Add to Cart Icon */}
  <Button 
  variant="outlined" 
  color="primary" 
  sx={{ 
    flex: 1, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minWidth: '50%',
    transition: '0.3s', // Smooth transition
    '&:hover': { 
      backgroundColor: 'primary.main', 
      color: 'white' 
    } 
  }} 

  onClick={()=>navigate(`/cart`)}

>
  <ShoppingCartIcon />
</Button>


  {/* View Button */}
  <Button 
    variant="contained" 
    color="primary" 
    sx={{ flex: 1, marginLeft: '8px', minWidth: '50%' }} 
    onClick={() => navigate(`/product/${product?.id}`)}
  >
    View
  </Button>
</Box>

  </CardContent>
</Card>

    </Grid>
  );
}

export default ProductCardForList;
