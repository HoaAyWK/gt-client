import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Stack } from '@mui/material';

import { BillingAddress } from './components';
import { Iconify } from '../../components';
import BillingAddressForm from './BillingAddressForm';
import ACTION_STATUS from '../../constants/actionStatus';

const BillingAndAddress = ({ addresses, status, step, numSelected, onNext, onBack, user, onBackActiveStep, onSelectAddress }) => {
  const [openAddAddress, setOpenAddAddress] = useState(false);

  useEffect(() => {
    if (numSelected === 0) {
      onBackActiveStep(0);
    }
  }, [numSelected]);

  useEffect(() => {
    if (!user) {
      onBackActiveStep(0);
    }
  }, [user]);

  const handleSelectAddress = (address) => {
    onSelectAddress(address);
    onNext();
  };

  if (status === ACTION_STATUS.FAILED) {
    return <></>;
  }

  return (
    <Box sx={{ display: step === 1 ? 'block' : 'none' }}>
      <Stack spacing={2}>
        {user && (
          <BillingAddress
            item={{
              id: 0,
              acceptorName: user.firstName + " " + user.lastName,
              deliveryAddress: user.address,
              acceptorPhone: user.phone,
              isDefault: true
            }}
            onSelectAddress={handleSelectAddress}
          />
        )}
        {addresses.map((address) => (
          <BillingAddress key={address.name} item={address} onSelectAddress={handleSelectAddress} />
        ))}
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2
        }}
      >
        <Button color='inherit' onClick={onBack}>
          <Iconify icon='material-symbols:arrow-back-ios-new' width={16} height={16} />
          &nbsp;
          Back
        </Button>
        <Button color='primary' size='small' variant='contained' onClick={() => setOpenAddAddress(true)}>
          <Iconify icon='eva:plus-fill' width={20} height={20} />
          &nbsp;
          Add new address
        </Button>
      </Box>
      <BillingAddressForm
        dialogTitle='Add address'
        dialogContent='Add new shipping address'
        open={openAddAddress}
        handleClose={() => setOpenAddAddress(false)}
      />
    </Box>
  );
};

export default BillingAndAddress;
