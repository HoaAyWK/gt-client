import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { Iconify, Label } from '../../../components';
import { deleteShippingAddress } from '../shippingAddressSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import BillingAddressForm from '../BillingAddressForm';
import { updateAddress } from '../../auth/authSlice';

const BillingAddress = ({ item, showTitle, onSelectAddress, onClickEdit, countries, sx }) => {
  const {
    id,
    receiverName,
    phoneNumber,
    isDefault,
    street,
    city,
    state,
    country
  } = item;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const { updateAddressStatus, user } = useSelector((state) => state.auth);

  const handleOpenEditAddress = () => {
    setOpenEditAddress(true);
  };

  const handleCloseEditAddress = () => {
    setOpenEditAddress(false);
  };

  const handleSelectAddress = (address) => () => {
    onSelectAddress(address);
  };

  const handleClickSetAsDefault = () => {
    dispatch(updateAddress({ ...item, isDefault: true, customerId: user.id }));
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
    <>
      <Card sx={{ ...sx }}>
        <CardContent>
          {showTitle && (
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant='h6'>
                Shipping Address
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Stack spacing={1} direction='row' sx={{ alignItems: 'center' }}>
                <Typography variant='body1' fontWeight='bold' color='text.primary'>
                  {receiverName}
                </Typography>
                {!showTitle && isDefault ? (<Label color='info' sx={{ ml: 2 }}>Default</Label>)
                  : (
                    <Button size='small' color='primary' onClick={handleClickSetAsDefault}>
                      Set as default
                    </Button>
                  )}
              </Stack>
              {!showTitle && (
                <Stack spacing={1} direction='row'>
                  <Button color='primary' size='small' onClick={handleOpenEditAddress}>
                    <Iconify icon='eva:edit-outline' width={20} height={20} />
                    &nbsp;
                    Edit
                  </Button>
                </Stack>
              )}
              </Box>
            </Box>
            <Typography variant='body2' color='text.primary'>
              {`${street}, ${city}, ${state}, ${country}`}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography variant='body2' color='text.secondary'>
                {phoneNumber}
              </Typography>
              {!showTitle && (
                <Stack spacing={1} direction='row'>
                  {!isDefault && (
                    <Button color='inherit' variant='outlined' size='small' onClick={handleClickDelete}>
                      Delete
                    </Button>
                  )}
                  <Button variant='outlined' color='primary' size='small' onClick={handleSelectAddress(item)}>
                    Deliver to this address
                  </Button>
                </Stack>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>
      <BillingAddressForm
        open={openEditAddress}
        handleClose={handleCloseEditAddress}
        dialogTitle='Edit Shipping Address'
        dialogContent='Update your shipping address'
        address={item}
        isEdit={true}
        action={updateAddress}
        status={updateAddressStatus}
        countries={countries}
      />
    </>
  );
};

export default BillingAddress;
