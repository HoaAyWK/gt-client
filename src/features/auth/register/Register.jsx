import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

import { AuthLayout } from '../layouts';
import { AuthFooter } from '../components';
import { register } from '../authSlice';
import MultiStepsRegisterForm from './components/MultiStepsRegisterForm';
import { Page } from '../../../components';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const dispatch = useDispatch();
  const { registerStatus } = useSelector(state => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const submit = async (data) => {
    const actionResult = await dispatch(register(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar('Register successfully', { variant: 'success' });
      navigate('/login');
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
      <Page title='Register'>
        <Typography variant='h3' component='h1' align='center'>
          Create a new account
        </Typography>
        <MultiStepsRegisterForm submit={submit} status={registerStatus} />
        <AuthFooter action='sign up for' />
      </Page>
    </AuthLayout>
  );
};

export default Register;
