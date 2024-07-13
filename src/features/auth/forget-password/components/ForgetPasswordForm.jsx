import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import ACTION_STATUS from '../../../../constants/actionStatus';
import PATHS from '../../../../constants/paths';
import { forgetPassword } from '../../authSlice';

const ForgetPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { forgetPasswordStatus } = useSelector(state => state.auth);

  const ForgetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required.')
      .email('Email must be a valid email address.'),
  });

  const defaultValues = {
    email: ''
  };

  const methods = useForm({
    resolver: yupResolver(ForgetPasswordSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const submit = async (data) => {
    const actionResult = await dispatch(forgetPassword(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      navigate(PATHS.RESET_PASSWORD, { state: { email: data.email } });
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
  }

  return (
    <Box
      sx={{ width: '100%' }}
    >
      <Box sx={{ my: 2 }}>

        <Typography variant='body2' align='center' >
          Please enter the your email address. We will send you an OTP to reset your password.
        </Typography>
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(submit)}>
        <Stack spacing={2}>
          <RHFTextField name='email' label='Email Address' type='email' />
        </Stack>
        <Box sx={{ my: 3 }}>
          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            loading={forgetPasswordStatus === ACTION_STATUS.LOADING}
          >
            Submit
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default ForgetPasswordForm;
