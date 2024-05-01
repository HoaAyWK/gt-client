import React from 'react';
import { Box } from '@mui/material';

const DashedLine = () => {
  return (
    <Box
      sx={{
        width: '100%',
        borderBottom: (theme) => `1px dashed ${theme.palette.divider}`
      }}
    />
  );
};

export default DashedLine;
