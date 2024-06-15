import React, { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { alpha } from '@mui/material';

import { Brand } from './components';
import { getBrands, selectAllBrands } from './brandSlice';
import ACTION_STATUS from '../../../constants/actionStatus';

const Brands = () => {
  const brands = useSelector(selectAllBrands);
  const { getBrandsStatus } = useSelector((state) => state.brands);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getBrandsStatus === ACTION_STATUS.IDLE) {
      dispatch(getBrands());
    }
  }, [getBrandsStatus]);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          '&::before': {
            background: theme => `radial-gradient(ellipse at center, ${theme.palette.background.paper} 25%, ${alpha(theme.palette.text.primary, 0.25)} 100%) !important;`,
            position: 'absolute',
            display: 'block',
            content: '" "',
            width: '100%',
            height: '1px',
            top: '50%',
            zIndex: 0
          },
          textAlign: 'center'
      }}
      >
        <Typography
          variant="h4"
          component="h2"
          mt={4}
          mb={2}
          sx={{
            position: 'relative',
          }}
        >
          Top Brands
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {brands.map(brand => (
          <Grid key={brand.id} item xs={6} sm={4} md={3}>
            <Brand brand={brand} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Brands;
