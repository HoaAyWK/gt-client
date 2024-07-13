import React from 'react';
import { Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

import { AuthFooter } from '../components';
import { AuthLayout } from '../layouts';
import { verifyEmail } from '../authSlice';
import { Page } from '../../../components';
import { VerifyEmailForm } from './components';
import PATHS from '../../../constants/paths';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { enqueueSnackbar } = useSnackbar();
  const { verifyEmailStatus } = useSelector(state => state.auth);

  const submit = async (data) => {
    data.email = state?.email;

    const actionResult = await dispatch(verifyEmail(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar('Verify email successfully!', { variant: 'success' });
      navigate(PATHS.LOGIN);
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
    <AuthLayout>
      <Page title='Verify email'>
        <Typography variant='h3' component='h1' align='center'>
          Verify your email
        </Typography>
        <VerifyEmailForm
          submit={submit}
          status={verifyEmailStatus}
          email={state?.email} />
        <AuthFooter action='using' />
      </Page>
    </AuthLayout>
  );
};

export default VerifyEmail;
