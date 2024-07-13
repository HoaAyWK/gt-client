import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

import { Iconify, Label } from '../../../../components';
import { updateAddress, deleteAddress } from '../../../auth/authSlice';
import BillingAddressForm from '../../../checkout/BillingAddressForm';
import ConfirmDialog from '../../../common/ConfirmDialog';
import ConfirmDialogV2 from '../../../common/ConfirmDialogV2';

const AddressCard = ({ address, countries }) => {
  const {
    isDefault,
    receiverName,
    phoneNumber,
    street,
    city,
    state,
    country,
  } = address;

  const dispatch = useDispatch();
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { updateAddressStatus, deleteAddressStatus, user } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenEditAddress = () => {
    setOpenEditAddress(true);
  };

  const handleCloseEditAddress = () => {
    setOpenEditAddress(false);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleClickSetAsDefault = () => {
    dispatch(updateAddress({ ...address, isDefault: true, customerId: user.id }));
  };

  const handleClickDelete = async () => {
    const actionResult = await dispatch(deleteAddress({ customerId: user.id, id: address.id }));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar('Deleted successfully', { variant: 'success' });
    }

    if (result.errors) {
      const errorKeys = Object.keys(result.errors);
      errorKeys.forEach((key) => {
        result.errors[key].forEach(error => {
          enqueueSnackbar(error, { variant: "error" });
        }
      )});

      return;
    }

    enqueueSnackbar(result.error, { variant: "error" });
  };

  return (
    <>
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Stack spacing={1} direction='row' sx={{ alignItems: 'center' }}>
            <Typography variant='body1' fontWeight='bold' color='text.primary'>
              {receiverName}
            </Typography>
            {isDefault && (<Label color='info' sx={{ ml: 2 }}>Default</Label>)}
          </Stack>
          <Stack spacing={1} direction='row'>
            <Button color='primary' size='small' onClick={handleOpenEditAddress}>
              <Iconify icon='eva:edit-outline' width={20} height={20} />
              &nbsp;
              Edit
            </Button>
            {!isDefault && (
              <Button color='error' size='small' onClick={handleOpenConfirmDialog}>
                <Iconify icon='eva:trash-outline' width={20} height={20} />
                &nbsp;
                Delete
              </Button>
            )}
            </Stack>
          </Box>
        </Box>
        <Typography variant='body2' color='text.primary'>
          {`${street}, ${city}, ${state}, ${country}`}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography variant='body2' color='text.secondary'>
            {phoneNumber}
          </Typography>
            <Stack spacing={1} direction='row'>
              {!isDefault && (
                <Button
                  size='small'
                  color='inherit'
                  variant='outlined'
                  onClick={handleClickSetAsDefault}
                >
                  Set as default
                </Button>
              )}
            </Stack>
        </Box>
      </Stack>
      <BillingAddressForm
        open={openEditAddress}
        handleClose={handleCloseEditAddress}
        dialogTitle='Edit Shipping Address'
        dialogContent='Update your shipping address'
        address={address}
        isEdit={true}
        action={updateAddress}
        status={updateAddressStatus}
        countries={countries}
      />
      <ConfirmDialogV2
        dialogTitle='Confirm delete address'
        dialogContent='Are you sure to delete this address'
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        status={deleteAddressStatus}
        onConfirm={handleClickDelete}
      />
    </>
  );
};

export default AddressCard;
