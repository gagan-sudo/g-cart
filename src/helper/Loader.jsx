import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Loader = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loader;
