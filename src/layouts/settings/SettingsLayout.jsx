import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';

import { Navbar } from './nav';
import { Loading } from '../../components';


const SettingsLayout = () => {
  return (
    <Grid container spacing={1} sx={{ mt: 12, mb: 20 }}>
      <Grid item xs={12} md={4} lg={3}>
        <Navbar />
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Grid>
    </Grid>
  );
};

export default SettingsLayout;
