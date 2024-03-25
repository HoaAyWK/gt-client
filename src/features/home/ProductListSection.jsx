import React from 'react';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import { ProductCard } from '../common/components';



const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('xs')]: {
    justifyContent: 'flex-start',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
  }
}));

const ProductListSection = ({ title, products, favorites, value, sendEvent, path }) => {
  return (
    <Box
      sx={{ mt: 4 }}
    >
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Typography variant='h5' component='h1' color='text.primary'>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledBox>
            <Stack spacing={1} direction='row'>
              <Button color='primary' LinkComponent={RouterLink} to={path} sx={{ textDecoration: 'underline' }}>
                Show all
              </Button>
            </Stack>
          </StyledBox>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {products?.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard favorites={favorites} product={product} sendEvent={sendEvent} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductListSection;
