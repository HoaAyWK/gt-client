import React from 'react';
import { Typography } from '@mui/material';

import { AuthFooter } from '../components';
import { AuthLayout } from '../layouts';
import { Page } from '../../../components';
import { ForgetPasswordForm } from './components';

const ForgetPassword = () => {
  return (
    <AuthLayout>
      <Page title='Forget Password'>
        <Typography variant='h3' component='h1' align='center'>
          Forget your password?
        </Typography>
        <ForgetPasswordForm />
        <AuthFooter action='using' />
      </Page>
    </AuthLayout>
  );
};

export default ForgetPassword;
