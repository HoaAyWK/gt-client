import React, { useEffect, useState, useMemo } from 'react';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { BillingAddress } from './components';
import { Iconify } from '../../components';
import BillingAddressForm from './BillingAddressForm';
import ACTION_STATUS from '../../constants/actionStatus';
import { addAddress } from '../auth/authSlice';
import { selectAllCountries, getCountries } from '../common/countrySlice';

const BillingAndAddress = (props) => {
  const {
    addresses,
    status,
    step,
    numSelected,
    onNext,
    onBack,
    user,
    onBackActiveStep,
    onSelectAddress
  } = props;

  const dispatch = useDispatch();
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const { addAddressStatus } = useSelector(state => state.auth);
  const { getCountriesStatus } = useSelector(state => state.countries);
  const countries = useSelector(selectAllCountries);

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

  useEffect(() => {
    if (getCountriesStatus === ACTION_STATUS.IDLE) {
      dispatch(getCountries());
    }
  }, [getCountriesStatus]);

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
        {addresses.map((address) => (
          <BillingAddress
            key={address.id}
            item={address}
            onSelectAddress={handleSelectAddress}
            countries={countries}
          />
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
        isEdit={false}
        action={addAddress}
        status={addAddressStatus}
        countries={countries}
      />
    </Box>
  );
};

export default BillingAndAddress;
