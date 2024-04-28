import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { Iconify, Label } from '../../../../components';
import { updateAddress, deleteAddress } from '../../../auth/authSlice';
import BillingAddressForm from '../../../checkout/BillingAddressForm';
import ConfirmDialog from '../../../common/ConfirmDialog';

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

  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { updateAddressStatus, deleteAddressStatus } = useSelector((state) => state.auth);

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
                <Button size='small' color='inherit' variant='outlined' >
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
      <ConfirmDialog
        dialogTitle='Confirm delete address'
        dialogContent='Are you sure to delete this address'
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        itemId={address.id}
        action={deleteAddress}
        status={deleteAddressStatus}
      />
    </>
  );
};

export default AddressCard;
