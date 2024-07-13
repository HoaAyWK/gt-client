import React from 'react';
import { Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

import { AuthFooter } from '../components';
import { AuthLayout } from '../layouts';
import { resetPassword } from '../authSlice';
import { Page } from '../../../components';
import { ResetPasswordForm } from './components';
import PATHS from '../../../constants/paths';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { enqueueSnackbar } = useSnackbar();
  const { resetPasswordStatus } = useSelector(state => state.auth);

  const submit = async (data) => {
    data.email = state?.email;

    const actionResult = await dispatch(resetPassword(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar('Reset password successfully!', { variant: 'success' });
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
      <Page title='Reset password'>
        <Typography variant='h3' component='h1' align='center'>
          Reset your password
        </Typography>
        <ResetPasswordForm
          submit={submit}
          status={resetPasswordStatus}
          email={state?.email} />
        <AuthFooter action='using' />
      </Page>
    </AuthLayout>
  );
};

export default ResetPassword;
