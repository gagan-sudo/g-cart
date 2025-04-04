import React from "react";
import { Container, Grid, Typography, Link, Box, Divider, useTheme, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();

  return (
    <>
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        py: 6,
        mt: 5,
        borderTop: `2px solid ${theme.palette.primary.main}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              G-Cart
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your one-stop shop for the best deals on quality products.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Links
            </Typography>
            <Divider sx={{ mb: 1, backgroundColor: "text.secondary" }} />
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="#" color="inherit" underline="hover">Home</Link>
              <Link href="#" color="inherit" underline="hover">Shop</Link>
              <Link href="#" color="inherit" underline="hover">About Us</Link>
              <Link href="#" color="inherit" underline="hover">Contact</Link>
            </Box>
          </Grid>

          {/* Customer Support */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Support
            </Typography>
            <Divider sx={{ mb: 1, backgroundColor: "text.secondary" }} />
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="#" color="inherit" underline="hover">FAQ</Link>
              <Link href="#" color="inherit" underline="hover">Returns</Link>
              <Link href="#" color="inherit" underline="hover">Shipping</Link>
              <Link href="#" color="inherit" underline="hover">Privacy Policy</Link>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Follow Us
            </Typography>
            <Divider sx={{ mb: 1, backgroundColor: "text.secondary" }} />
            <Box display="flex" gap={2}>
              <IconButton href="#" color="inherit"><Facebook /></IconButton>
              <IconButton href="#" color="inherit"><Twitter /></IconButton>
              <IconButton href="#" color="inherit"><Instagram /></IconButton>
              <IconButton href="#" color="inherit"><LinkedIn /></IconButton>
            </Box>
          </Grid>
        </Grid>
        
      </Container>
      
    </Box>
    <Typography backgroundColor={'primary.main'} variant="body2" textAlign="center" p={2}  color={theme.palette.secondary.dark}>
          &copy; {new Date().getFullYear()} G-Cart. All rights reserved.
        </Typography>
    </>
  );
};

export default Footer;
