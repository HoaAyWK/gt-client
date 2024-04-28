import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Iconify, Page } from '../../components';

const ProfileOverview = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Page title='Profile'>
      <Stack spacing={2}>
        <Stack spacing={0.5} direction='row' sx={{ alignItems: 'center' }} >
          <Iconify
            icon='material-symbols:phone-enabled'
            width={24}
            height={24}
            style={{ color: '#454F5B' }}
          />
          <Grid container spacing={1}>
            <Grid item xs={1.5} >
              <Typography variant='subtitle1'>Phone:</Typography>
            </Grid>
            <Grid item xs={10.5} >
              <Typography variant='body1'>
                {user?.phone ?? 'not available'}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
        <Stack spacing={0.5} direction='row' sx={{ alignItems: 'center' }}>
          <Iconify
            icon='ic:baseline-calendar-month'
            width={24}
            height={24}
            style={{ color: '#454F5B' }}
          />
          <Grid container spacing={1}>
            <Grid item xs={1.5} >
              <Typography variant='subtitle1'>Join Date:</Typography>
            </Grid>
            <Grid item xs={10.5} >
              <Typography variant='body1'>
                {user?.dateOfBirth ?? 'not available'}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
        <Stack spacing={0.5} direction='row' sx={{ alignItems: 'center' }}>
          <Iconify
            icon='material-symbols:location-on'
            width={24}
            height={24}
            style={{ color: '#454F5B' }}
          />
          <Grid container spacing={1}>
            <Grid item xs={1.5} >
              <Typography variant='subtitle1'>Address:</Typography>
            </Grid>
            <Grid item xs={10.5} >
              <Typography variant='body1'>
                {user?.address ?? 'not available'}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Page>
  );
};

export default ProfileOverview;
