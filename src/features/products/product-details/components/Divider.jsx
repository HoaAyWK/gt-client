import React from 'react'
import { Box } from '@mui/material';

const Divider = () => {
  return (
    <Box
      sx={{
        width: '100%',
        borderBottom: 1,
        borderColor: (theme) => theme.palette.divider,
        borderBottomStyle: 'dashed',
        my: 3
      }}
    />
  );
};

export default Divider;
