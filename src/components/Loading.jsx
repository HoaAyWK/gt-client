import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        py: 8
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
