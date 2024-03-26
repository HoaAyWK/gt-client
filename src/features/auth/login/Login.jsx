import React from 'react';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

import { LoginForm } from './components';
import { AuthFooter } from '../components';
import { AuthLayout } from '../layouts';
import { login } from '../authSlice';
import { Page } from '../../../components';
import { useLocalStorage } from '../../../hooks';

const Login = () => {
  const dispatch = useDispatch();
  const [localCart] = useLocalStorage("cart", null);
  const { enqueueSnackbar } = useSnackbar();
  const { loginStatus } = useSelector(state => state.auth);

  const submit = async (data) => {
    if (localCart) {
      data.userCartId = localCart;
    }

    const actionResult = await dispatch(login(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar('Login successfully', { variant: 'success' });
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
      <Page title='Login'>
        <Typography variant='h3' component='h1' align='center'>
          Log in to HCI
        </Typography>
        <LoginForm submit={submit} status={loginStatus} />
        <AuthFooter action='sign in to' />
      </Page>
    </AuthLayout>
  );
};

export default Login;
