import { Button, Card, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

function ProductCardForList({ product }) {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={4} key={product.id}> {/* Increased width for xl devices */}
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}>
        <CardMedia
          component="img"
          sx={{ width: "100%", height: "200px", objectFit: "cover", backgroundColor: theme.palette.background.default }}
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
          <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
            ${product.price}
          </Typography>
          <Button variant="contained" color="primary" fullWidth>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ProductCardForList;
