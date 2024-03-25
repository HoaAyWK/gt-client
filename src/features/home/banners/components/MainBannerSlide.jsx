import React from 'react';
import { Box } from '@mui/material';

import { Cover } from '../../../../components';

const MainBannerSlide = ({ image }) => {
  return (
    <Box
      component='span'
      sx={{
        width: '100%',
        lineHeight: 1,
        display: 'block',
        overflow: 'hidden',
        borderRadius: 1,
      }}
    >
      <Cover
        sx={{
          width: '100%',
          height: 400,
          display: 'inline-block',
          objectFit: 'cover',
          borderRadius: 1
        }}
        src={image}
        alt='Product Image'
        loading='lazy'
      />
    </Box>
  );
};

export default MainBannerSlide;
