import React from "react";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Rating, Box, Divider } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase"; // make sure db is imported
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { showError, showToast } from "../helper/toast";


const ProductDetail = ({ product }) => {

  const navigate = useNavigate()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    appendDots: dots => (
      <div style={{ position: "absolute", bottom: "-30px", width: "100%", display: "flex", justifyContent: "center" }}>
        <ul style={{ margin: "0px", padding: "0px", display: "flex" }}>{dots}</ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  const addCart = async () => {
    const user = auth.currentUser;
    if (!user) {
      showError("You must be logged in to add items to the cart");
      navigate("/auth/signin");
      return;
    }
  
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        cart: arrayUnion({
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          image: product.images[0],
          addedAt: new Date(),
        }),
      });
  
      showToast("Product added to cart!");
    } catch (error) {
      showError("Failed to add to cart: " + error.message);
    }
  };
  


  return (
    <Container maxWidth="lg" sx={{ mt: 0, position: "relative" }}>
       <Button sx={{position:'fixed',right:15,top:75,zIndex:5000}} variant="contained" color="primary" onClick={()=>navigate(-1)} >
                   Back
                 </Button>
      <Grid container spacing={4} alignItems="stretch">
        {/* Image Slider */}
        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column" }}>
          <Card sx={{ flex: 1, p: 2, borderRadius: 3, boxShadow: 3, display: "flex", alignItems: "center" }}>
            <Slider {...settings} style={{ width: "100%" }}>
              {product.images.map((img, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  height="500"
                  image={img}
                  alt={`Product image ${index + 1}`}
                  sx={{ borderRadius: 2, objectFit: "contain", maxHeight: "500px", width: "auto", margin: "0 auto" }}
                />
              ))}
            </Slider>
          </Card>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column" }}>
          <Card sx={{ flex: 1, p: 4, borderRadius: 3, boxShadow: 3, overflowY: "auto", "@media (max-width: 768px)": { overflowY: "hidden", height: "auto" } }}>
            <CardContent>
              <Typography variant="h3" gutterBottom fontWeight={600}>
                {product.title}
              </Typography>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                {product.brand} - {product.category}
              </Typography>
              <Typography variant="h4" color="primary" fontWeight={700}>
                ${product.price} ({product.discountPercentage}% Off)
              </Typography>
              <Typography variant="h6" paragraph>{product.description}</Typography>
              <Rating value={product.rating} precision={0.1} readOnly sx={{ fontSize: "2rem" }} />
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" color="textSecondary">
                {product.availabilityStatus} | {product.stock} in stock
              </Typography>
              <Typography variant="h6">SKU: {product.sku} | Weight: {product.weight}kg</Typography>
              <Typography variant="h6">
                Dimensions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
              </Typography>
              <Typography variant="h6" color="secondary">Warranty: {product.warrantyInformation}</Typography>
              <Typography variant="h6" color="secondary">Shipping: {product.shippingInformation}</Typography>
              <Typography variant="h6" color="secondary">Return Policy: {product.returnPolicy}</Typography>
              <Typography variant="h6" color="textSecondary">
                Minimum Order Quantity: {product.minimumOrderQuantity}
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 3, width: "100%", fontSize: "1.4rem", py: 1.5, borderRadius: 2 }} onClick={addCart} >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Reviews Section */}
      <Box mt={5}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Customer Reviews
        </Typography>
        {product.reviews.map((review, index) => (
          <Card key={index} sx={{ mb: 2, p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" fontWeight={600}>{review.reviewerName}</Typography>
            <Rating value={review.rating} precision={0.1} readOnly sx={{ fontSize: "1.8rem" }} />
            <Typography variant="body1" color="textSecondary">
              {new Date(review.date).toLocaleDateString()}
            </Typography>
            <Typography variant="h6">{review.comment}</Typography>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default ProductDetail;
