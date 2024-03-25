import React from 'react';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import { Iconify, Label } from '../../../components';
import { deleteShippingAddress } from '../shippingAddressSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const BillingAddress = ({ item, showTitle, onSelectAddress, onClickEdit, sx }) => {
  const { id, acceptorName, isDefault, deliveryAddress, acceptorPhone } = item;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSelectAddress = (address) => () => {
    onSelectAddress(address);
  };

  const handleClickDelete = async () => {
    try {
      const actionResult = await dispatch(deleteShippingAddress(id));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar('Deleted successfully', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Card sx={{ ...sx }}>
      <CardContent>
        {showTitle && (
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='h6'>
              Billing Address
            </Typography>
            <Button color='primary' size='small' onClick={onClickEdit}>
              <Iconify icon='eva:edit-outline' width={20} height={20} />
              &nbsp;
              Edit
            </Button>
          </Box>
        )}
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Stack spacing={1} direction='row'>
              <Typography variant='body1' fontWeight='bold' color='text.primary'>
                {acceptorName}
              </Typography>
            </Stack>
            {isDefault && !showTitle && (<Label color='info' sx={{ ml: 2 }}>Default</Label>)}
          </Box>
          <Typography variant='body2' color='text.primary'>
            {deliveryAddress}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant='body2' color='text.secondary'>
              {acceptorPhone}
            </Typography>
            {!showTitle && (
              <Stack spacing={1} direction='row'>
                {!isDefault && (
                  <Button color='inherit' variant='outlined' size='small' onClick={handleClickDelete}>
                    Delete
                  </Button>
                )}
                <Button variant='outlined' color='primary' size='small' onClick={handleSelectAddress(id)}>
                  Deliver to this address
                </Button>
              </Stack>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BillingAddress;
