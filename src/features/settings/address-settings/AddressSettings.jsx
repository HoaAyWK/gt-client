import React, { Fragment, useMemo, useState, useEffect } from 'react';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { Iconify, Page } from '../../../components';
import { AddressCard } from './components';
import { addAddress } from '../../auth/authSlice';
import { selectAllCountries, getCountries } from '../../common/countrySlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import BillingAddressForm from '../../checkout/BillingAddressForm';

const AddressSettings = () => {
  const dispatch = useDispatch();
  const { user, addAddressStatus } = useSelector((state) => state.auth);
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const { getCountriesStatus } = useSelector(state => state.countries);
  const countries = useSelector(selectAllCountries);
  const addresses = useMemo(() => {
    if (!user || !user.addresses) return [];

    return user.addresses;
  }, [user]);

  useEffect(() => {
    if (getCountriesStatus === ACTION_STATUS.IDLE) {
      dispatch(getCountries());
    }
  }, [getCountriesStatus]);

  const handleOpenAddAddress = () => {
    setOpenAddAddress(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h6' component='h1'>
          My Addresses
        </Typography>
        <Button variant='contained' color='primary' onClick={handleOpenAddAddress}>
          <Iconify icon='eva:plus-outline' width={20} height={20} />
          &nbsp; Add New Address
        </Button>
      </Box>
      <Stack spacing={2}>
        {addresses.map((address) => (
          <Fragment key={address.id}>
            <Divider sx={{ my: 2 }} />
            <AddressCard
              key={address.id}
              address={address}
              countries={countries}
            />
          </Fragment>
        ))}
      </Stack>
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
    </>
  );
};

export default AddressSettings;
