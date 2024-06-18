import React, { useMemo } from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { Cover } from '../../../../components';
import PATHS from '../../../../constants/paths';

const HorizontalBannerSlide = ({ banner }) => {
  const url = useMemo(() => {
    if (banner?.product) {
      return PATHS.PRODUCTS + '/' + banner.product.id;
    }

    return '#';
  }, [banner]);

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
              <Typography variant='h4' component='h1' textAlign='end' color='text.secondary'>
                {banner?.product?.name}
              </Typography>
              <Typography variant='body1' textAlign='end'>
                {banner?.product?.shortDescription}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='outlined' component={RouterLink} to={url} >
                  Details
                </Button>
              </Box>
            </Stack>
        </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HorizontalBannerSlide;
