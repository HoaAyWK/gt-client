import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import { Cover } from '../../../../components';

const VerticalBannerSlide = ({ banner  }) => {
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
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Cover
          sx={{
            width: 'auto',
            height: 480,
            display: 'inline-block',
            objectFit: 'cover',
            borderRadius: 1
          }}
          src={banner?.product?.imageUrl}
          alt='Product Image'
          loading='lazy'
        />
        <Typography variant='h4' component='h1' textAlign='center' color='text.secondary'>
          {banner?.product?.name}
        </Typography>
        <Typography variant='body1' textAlign='center'>
          {banner?.product?.shortDescription}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='outlined'>
            Details
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default VerticalBannerSlide;
