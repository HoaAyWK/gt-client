import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const AdminSettings = () => {
  return (
    <Box>
      <Typography color='error' variant='h6' component='h1'>
        Delete Account
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant='body2' component='div' sx={{ mb: 0.5 }} color='text.secondary'>
        Once you delete your account, there is no going back. Please be certain.
      </Typography>
      <LoadingButton variant='outlined' color='error'>
        Delete Your Account
      </LoadingButton>
    </Box>
  );
};

export default AdminSettings;
