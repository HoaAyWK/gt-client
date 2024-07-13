import React, { useState } from 'react';
import { Box, Stack, Typography, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

import { Iconify } from '../../../../components';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import ACTION_STATUS from '../../../../constants/actionStatus';

const ResetPasswordForm = ({ submit, status, email }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { forgetPasswordStatus } = useSelector((state) => state.auth);

  const ResetPasswordSchema = Yup.object().shape({
    token: Yup.string().required('OTP is required.'),
    password: Yup.string().required('Password is required.'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required.')
      .oneOf([Yup.ref('password'), null], 'Confirm Password must match Password.'),
  });

  const defaultValues = {
    token: ''
  };

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    data.email = email;
    await submit(data);
  };

  const handleResendOTP = async () => {
    const actionResult = await dispatch(forgetPassword({ email }));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar('Resend OTP successfully!', { variant: 'success' });
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
    <Box
      sx={{ width: '100%' }}
    >
      <Box sx={{ my: 2 }}>
        <Typography variant='body2' align='center'>
          We've sent you an OTP to your email address.
        </Typography>
        <Typography variant='body2' align='center' >
          Please enter the OTP to reset your password.
        </Typography>
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <RHFTextField name='token' label='OTP' type='number' />
          <RHFTextField
            name='password'
            type={showPassword ? 'text' : 'password' }
            label='Password'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
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
        <Box sx={{ my: 3 }}>
          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            loading={status === ACTION_STATUS.LOADING}
          >
            Submit
          </LoadingButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='body2' component='span'>Haven't received the OTP yet?</Typography>
          &nbsp;
          <LoadingButton
            variant='text'
            onClick={handleResendOTP}
            loading={forgetPasswordStatus === ACTION_STATUS.LOADING}
          >
            Resend OTP
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default ResetPasswordForm;
