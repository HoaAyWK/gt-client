import React, { useMemo, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { FormProvider, RHFTextField } from '../../components/hook-form';
import { useSnackbar } from 'notistack';
import { addShippingAddress } from './shippingAddressSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import ACTION_STATUS from '../../constants/actionStatus';
import { getCountries, selectAllCountries } from '../common/countrySlice';
import { getStates, refreshStates, selectAllStates } from '../common/stateSlice';
import { addAddress } from '../auth/authSlice';

const BillingAddressForm = (props) => {
  const defaultCountryId = 240;
  const defaultStateId = 3811;
  const {
    open,
    handleClose,
    dialogTitle,
    dialogContent,
    isEdit,
    address,
    action,
    status,
    countries
  } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const countryId = useMemo(() => {
    if (address) {
      return address.countryId ?? defaultCountryId;
    }
    return defaultCountryId;
  }, [address]);

  const stateId = useMemo(() => {
    if (address) {
      return address.stateId ?? defaultStateId;
    }
    return defaultStateId;
  });

  const { getCountriesStatus } = useSelector((state) => state.countries);
  const { getStatesStatus } = useSelector((state) => state.states);
  const { user } = useSelector((state) => state.auth);
  const states = useSelector(selectAllStates);
  const [country, setCountry] = useState(countryId);
  const [state, setState] = useState(stateId);
  const [stateName, setStateName] = useState('');
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    if (getCountriesStatus === ACTION_STATUS.SUCCEEDED && countries && countries.length > 0) {
      const selectedCountry = countries.find((country) => country.id === countryId);

      if (selectedCountry) {
        setCountryName(selectedCountry.name);
      }
    }
  }, [getCountriesStatus, countryId]);

  useEffect(() => {
    if (open) {
      dispatch(refreshStates());
      dispatch(getStates(country));
    }
  }, [open, country]);

  useEffect(() => {
    if (getStatesStatus === ACTION_STATUS.SUCCEEDED && states.length > 0) {
      if (country !== countryId) {
        setState(states[0].id);
        setStateName(states[0].name);
      }
      else {
        const selectedState = states.find((state) => state.id === stateId);

        if (selectedState) {
          setStateName(selectedState.name);
        }
      }
    }
  }, [getStatesStatus, country, stateId]);

  const ShippingAddressSchema = Yup.object().shape({
    receiverName: Yup.string()
      .required('Full name is required.'),
    phoneNumber: Yup.string()
      .required('Phone Number is required.')
      .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Phone number is not valid.'),
    street: Yup.string()
      .required('Street is required.'),
    city: Yup.string()
      .required('City is required.'),
    zipCode: Yup.string()
      .required('Zip code is required.')
  });

  const defaultValues = {
    receiverName: address ? address.receiverName : '',
    phoneNumber: address ? address.phoneNumber : '',
    street: address ? address.street : '',
    city: address ? address.city : '',
    zipCode: address ? address.zipCode : ''
  };

  const methods = useForm({
    resolver: yupResolver(ShippingAddressSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    data.stateId = state;
    data.state = stateName;
    data.countryId = country;
    data.country = countryName;
    data.customerId = user.id;

    if (address) {
      data.id = address.id;
    }

    console.log(data);

    const actionResult = await dispatch(action(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar(`${isEdit ? 'Edited' : 'Added' } successfully!`, { variant: 'success' });
      if (!isEdit) {
        onClose();
      } else {
        handleClose();
      }
      return;
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

  const onClose = () => {
    reset();
    handleClose();
  };

  const handleCountryIdChange = (event) => {
    const id = event.target.value;

    setCountry(id);

    const country = countries.find((country) => country.id === id);

    if (country) {
      setCountryName(country.name);
    }
  };

  const handleStateIdChange = (event) => {
    const id = event.target.value;

    setState(id);

    const state = states.find((state) => state.id === id);

    if (state) {
      setStateName(state.name);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogContent && (<DialogContent>{dialogContent}</DialogContent>)}
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <RHFTextField name='receiverName' label='Full name' />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField name='phoneNumber' label='Phone number' />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField name='street' label='Street' />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField name='city' label='City' />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='select-stateId'>State</InputLabel>
                  <Select
                    labelId='select-stateId'
                    id='stateId'
                    value={state}
                    label='state'
                    onChange={handleStateIdChange}
                  >
                    {states && states.map((state) => (
                      <MenuItem key={state.id} value={state.id}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='select-countryId'>Country</InputLabel>
                  <Select
                    labelId='select-countryId'
                    id='countryId'
                    value={country}
                    label='Country'
                    onChange={handleCountryIdChange}
                  >
                    {countries && countries.map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <RHFTextField name='zipCode' label='Zip Code' />
              </Grid>
            </Grid>
        </Box>
        <DialogActions>
          <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
            <Button variant='contained' color='inherit' onClick={onClose}>Cancel</Button>
            <LoadingButton
              variant='contained'
              color='primary'
              type='submit'
              loading={status === ACTION_STATUS.LOADING ? true : false}
            >
              Save
            </LoadingButton>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  )
}

export default BillingAddressForm
