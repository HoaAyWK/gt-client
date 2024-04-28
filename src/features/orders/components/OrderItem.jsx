import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

import { Iconify } from '../../../components';
import { fCurrency } from '../../../utils/formatNumber';

const OrderItem = ({ item }) => {
  const {
    productId,
    productVariantId,
    productName,
    productImage,
    quantity,
    unitPrice,
    subTotal,
    totalDiscount
  } = item;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Stack spacing={1} direction='row' sx={{ minWidth: 250 }}>
        <Box
          component='img'
          src={productImage}
          alt={productName}
          sx={{
            width: 56,
            height: 56,
            objectFit: 'cover',
            borderRadius: 1
          }}
        />
        <Stack spacing={0.5}>
          <Typography variant='subtitle1' color='text.primary'>{productName}</Typography>
          <Stack spacing={1} direction='row'>
            <Iconify icon='fluent-mdl2:quantity' width={24} height={24} sx={{ color: 'text.secondary' }} />
            <Typography variant='body1' color='text.primary'>{quantity}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Typography variant='subtitle1' color='text.primary'>{fCurrency(subTotal)}</Typography>
    </Box>
  );
};

export default OrderItem;
