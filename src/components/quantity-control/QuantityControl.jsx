import React from 'react';
import { Box, IconButton } from '@mui/material';

import { StyledBox } from './styles';
import Iconify from '../iconify';

const QuantityControl = ({ quantity, increaseQuantity, decreaseQuantity, max }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <StyledBox>
        <IconButton size='small' onClick={decreaseQuantity} disabled={quantity === 1}>
          <Iconify icon='eva:minus-fill' width={20} height={20} />
        </IconButton>
        <Box sx={{ mx: 1, minWidth: 20, display: 'flex', justifyContent: 'center' }}>
          {quantity}
        </Box>
        <IconButton size='small' onClick={increaseQuantity} disabled={quantity === max}>
          <Iconify icon='eva:plus-fill' width={20} height={20} />
        </IconButton>
      </StyledBox>
    </Box>
  );
};

export default QuantityControl;
