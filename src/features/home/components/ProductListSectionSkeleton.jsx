import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Skeleton, Stack, Typography } from '@mui/material';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('xs')]: {
    justifyContent: 'flex-start',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
  }
}));

const ProductListSectionSkeleton = () => {
  return (
    <Box
      sx={{ mt: 4, width: '100%' }}
    >
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Skeleton variant='rounded'>
            <Typography variant='h5' component='h1' color='text.primary'>
              Text
            </Typography>
          </Skeleton>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledBox>
            <Stack spacing={1} direction='row'>
              <Skeleton variant='rounded'>
                <Button variant='contained' color='primary'>
                  Laptop
                </Button>
              </Skeleton>
              <Skeleton variant='rounded'>
                <Button>
                  Smartphone
                </Button>
              </Skeleton>
              <Skeleton variant='rounded'>
                <Button>
                  Components
                </Button>
              </Skeleton>
            </Stack>
          </StyledBox>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product}>
            <Skeleton variant='rounded' width='100%' height={200} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductListSectionSkeleton;
