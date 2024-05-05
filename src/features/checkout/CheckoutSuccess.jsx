import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import checkout from '../../assets/images/checkout.png';
import { runFireworks } from '../../utils/runFireworks';

const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    runFireworks();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Box>
        <Box
          component='img'
          src={checkout}
          alt='image'
          sx={{
            width: 240,
            height: 240,
            objectFit: 'cover',
            mb: 4
          }}
        />
        <Stack spacing={1}>
          <Typography variant='h6'>
            Thank you for your order!
          </Typography>
          <Link component={RouterLink} to='/' underline='hover' textAlign='center' fontWeight='bold'>
            View order details
          </Link>
          <Button variant='contained' LinkComponent={RouterLink} to='/' >
            Continue shopping
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CheckoutSuccess;
