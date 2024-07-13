import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

import { AvatarUploader } from '../../../../components';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { updateAccount } from '../../accountSlice';
import ACTION_STATUS from '../../../../constants/actionStatus';

const AccountSettingsForm = ({ user }) => {
  const dispatch = useDispatch();
  const { updateAccountStatus } = useSelector((state) => state.account);
  const { enqueueSnackbar } = useSnackbar();

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required.'),
    lastName: Yup.string().required('Last Name is required.'),
    email: Yup.string().required('Email is required.'),
    phoneNumber: Yup.string()
      .required('Phone is required.')
      .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Phone number is not valid.'),
    image: Yup.mixed()
  });

  const defaultValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    avatar: user.avatarUrl,
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    data.id = user.id;
    const actionResult = await dispatch(updateAccount(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar('Updated successfully', { variant: 'success' });
      reset({ ...user, avatar: '' });

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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={2}
        sx={{
          flexDirection: {
            xs: 'column-reverse',
            md: 'row'
          }
        }}
      >
        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            <RHFTextField name='firstName' label='First Name' />
            <RHFTextField name='lastName' label='Last Name' />
            <RHFTextField name='email' label='Email' disabled />
            <RHFTextField name='phoneNumber' label='Phone' />
          </Stack>
          <Box sx={{ mt: 2 }}>
            <LoadingButton
              color='primary'
              variant='contained'
              type='submit'
              loading={updateAccountStatus === ACTION_STATUS.LOADING ? true : false}
            >
              Update Profile
            </LoadingButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant='body2' >Profile picture</Typography>
          <Box
            sx={{ marginBlock: 1 }}
          >
            <AvatarUploader avatarUrl={user.avatarUrl} name='avatar' />
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default AccountSettingsForm;
