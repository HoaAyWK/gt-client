import React from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import { Cover } from '../../../../components';

const HorizontalBannerSlide = ({ banner }) => {
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <Stack spacing={1}>
              <Typography variant='h4' component='h1' textAlign='center' color='text.secondary'>
                {banner?.product?.name}
              </Typography>
              <Typography variant='body1' textAlign='center'>
                {banner?.product?.shortDescription}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='outlined'>
                  Details
                </Button>
              </Box>
            </Stack>
        </Box>
        </Grid>
        <Grid item xs={12} md={7}>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default HorizontalBannerSlide;
