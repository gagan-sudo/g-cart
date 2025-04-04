import React from 'react';
import { Card, CardContent, CardMedia, Typography, Rating, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ProductCardForSlider = ({ product }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[3],
        ":hover": {
          boxShadow: theme.shadows[6],
          cursor: "pointer",
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: "100%", height: "180px", objectFit: "cover", backgroundColor: theme.palette.background.default }}
        image={product.images[0]}
        alt={product.title}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="h6" gutterBottom color="primary">
          {product.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {product.description.substring(0, 60)}...
        </Typography>
        <Rating name="read-only" value={product.rating || 0} precision={0.5} readOnly />
        <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main }}>
          ${product.price}
        </Typography>
        <Button variant="contained" color="primary" fullWidth>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCardForSlider;
