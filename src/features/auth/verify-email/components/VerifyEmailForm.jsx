import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import ACTION_STATUS from '../../../../constants/actionStatus';
import { sendConfirmationEmail } from '../../authSlice';

const VerifyEmailForm = ({ submit, status, email }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { sendConfirmationEmailStatus } = useSelector((state) => state.auth);

  const VerifyEmailSchema = Yup.object().shape({
    token: Yup.string().required('OTP is required.')
  });

  const defaultValues = {
    token: ''
  };

  const methods = useForm({
    resolver: yupResolver(VerifyEmailSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    await submit(data);
  };

  const handleResendOTP = async () => {
    const actionResult = await dispatch(sendConfirmationEmail({ email }));
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
          Please enter the OTP to verify your email.
        </Typography>
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <RHFTextField name='token' label='OTP' type='number' />
        </Stack>
        <Box sx={{ my: 3 }}>
          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            loading={status === ACTION_STATUS.LOADING ? true : false}
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
            loading={sendConfirmationEmailStatus === ACTION_STATUS.LOADING}
          >
            Resend OTP
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default VerifyEmailForm;
