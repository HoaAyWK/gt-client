import React, { useMemo } from 'react';
import { Grid } from '@mui/material';

import { MainBannerSlider } from './components';

const Banners = ({ banners }) => {
  const activeBanners = useMemo(() => {
    return banners.filter((banner) => banner.isActive === true);
  }, [banners]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MainBannerSlider banners={activeBanners} />
      </Grid>
    </Grid>
  );
};

export default Banners;
