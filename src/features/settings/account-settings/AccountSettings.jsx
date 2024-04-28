import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import AccountSettingsForm from './components/AccountSettingsForm';

const AccountSettings = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Typography variant='h6' component='h1'>
        My Profile
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box>
        <AccountSettingsForm user={user} />
      </Box>
    </>
  );
};

export default AccountSettings;
