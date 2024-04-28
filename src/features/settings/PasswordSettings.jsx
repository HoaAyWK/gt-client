import React, { useState } from 'react';
import { Box, Typography, Divider, Stack, Grid, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import { FormProvider, RHFTextField } from '../../components/hook-form';
import { changePassword } from './accountSlice';
import { logout } from '../auth/authSlice';
import { Iconify, Page } from '../../components';
import ACTION_STATUS from '../../constants/actionStatus';

const PasswordSettings = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { changePasswordStatus } = useSelector((state) => state.account);

  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .required('New Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Confirm Password must match New Password')
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  const methods = useForm({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      const actionResult = await dispatch(changePassword(data));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar('Changed password successfully. Please, log in again!', { variant: 'success' });
        dispatch(logout());
        navigate('/login');
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <>
      <Typography variant='h6' component='h1'>
        Change password
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} sm={7}>
              <Stack spacing={2}>
                <RHFTextField name='oldPassword' type='password' label='Old Password' />
                <RHFTextField
                  name='newPassword'
                  type={showNewPassword ? 'text' : 'password' }
                  label='Password'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge='end'>
                          <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <RHFTextField
                  name='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password' }
                  label='Confirm Password'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge='end'>
                          <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Stack>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant='caption' color='text.secondary' component='div' sx={{ mb: 0.5 }} >
                Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.
              </Typography>
              <LoadingButton
                type='submit'
                variant='outlined'
                loading={changePasswordStatus === ACTION_STATUS.LOADING ? true : false}
              >
                Update Password
              </LoadingButton>
            </Box>
          </Grid>
        </FormProvider>
      </Box>
    </>
  );
};

export default PasswordSettings;
