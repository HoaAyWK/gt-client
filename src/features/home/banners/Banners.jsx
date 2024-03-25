import React, { useMemo } from 'react';
import { Grid, Stack } from '@mui/material';

import { SecondaryBanner, MainBannerSlider } from './components';

import { BANNER_POSITION } from '../../../constants/banner';

const Banners = ({ banners }) => {
  const slideBanners = useMemo(() => {
    return banners?.filter((banner) => banner?.field === BANNER_POSITION.MAIN);
  }, [banners]);

  const secondaryBanners = useMemo(() => {
    return banners?.filter((banner) => banner?.field === BANNER_POSITION.SUB);
  }, [banners]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <MainBannerSlider banners={slideBanners} />
      </Grid>
      <Grid item xs={12} md={5}>
        <Stack spacing={2.5}>
          {secondaryBanners?.map((banner) => (
            <SecondaryBanner key={banner?.id} image={banner?.image} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Banners;
