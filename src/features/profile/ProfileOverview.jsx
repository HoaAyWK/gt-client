import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Iconify, Page } from '../../components';

const ProfileOverview = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Page title='Profile'>
      <Stack spacing={2}>
        <Stack spacing={1} direction='row'>
          <Iconify icon='material-symbols:phone-enabled' width={24} height={24} />
          <Typography variant='body1'>
            {user?.phone}
          </Typography>
        </Stack>
        <Stack spacing={1} direction='row'>
          <Iconify icon='ic:baseline-calendar-month' width={24} height={24} />
          <Typography variant='body1'>
            {user?.dateOfBith}
          </Typography>
        </Stack>
        <Stack spacing={1} direction='row'>
          <Iconify icon='material-symbols:location-on' width={24} height={24} />
          <Typography variant='body1'>
            {user?.address}
          </Typography>
        </Stack>
      </Stack>
    </Page>
  );
};

export default ProfileOverview;
