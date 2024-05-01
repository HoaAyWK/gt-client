import React from 'react';
import { Box, IconButton, Stack, Typography, Tooltip, Grid } from '@mui/material';

import { Iconify } from '../../../../components';

const OrderItemLine = ({ item }) => {
  const { productName, productImage, quantity, unitPrice, productAttributes } = item;
  return (
    <Grid container spacing={0.5}>
      <Grid item xs={9} >
      <Stack direction='row' spacing={2} alignItems='center'>
        <Box
          component='img'
          src={productImage}
          alt={productName}
          sx={{
            width: 56,
            height: 56,
            objectFit: 'cover',
            borderRadius: 1,
            my: 1
          }}
        />
        <Stack spacing={0.5}>
          <Typography variant='subtitle2'>
            {productName}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {productAttributes}
          </Typography>
        </Stack>
      </Stack>
      </Grid>
      <Grid item xs={1}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <Typography variant='body2'>
            x{quantity}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <Typography variant='subtitle2'>
            ${unitPrice * quantity}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OrderItemLine;
