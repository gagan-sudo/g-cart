import React, { useState } from 'react';
import { Box, Button, Typography, Dialog, DialogContent, Grid, useTheme } from '@mui/material';
import { useGetCategoriesListQuery } from '../services/categories';
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: categories = [] } = useGetCategoriesListQuery();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{  padding: '20px' , }}>
      <Button sx={{position:'fixed',zIndex:5000}} variant="contained" color="primary" onClick={handleOpen}>
        Categories
      </Button>
      
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          <Grid container spacing={2} sx={{ maxHeight: '400px', overflow: 'auto' }}>
            {categories.map((category, index) => (
              <Grid 
                item 
                xs={6} sm={4} md={3} 
                key={index} 
                sx={{ textAlign: 'center' }}
              >
                <Typography 
                  onClick={() => { navigate(`/${category}`); handleClose(); }}
                  sx={{
                    padding: '10px',
                    borderRadius: '8px',
                    color:theme.palette.primary.main,
                    cursor: 'pointer',
                    ':hover': { backgroundColor: theme.palette.secondary.main },
                  }}
                >
                  {category.toUpperCase()}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CategoryList;
