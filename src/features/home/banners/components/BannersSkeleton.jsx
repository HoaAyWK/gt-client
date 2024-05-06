import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Skeleton, Stack } from '@mui/material';

const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  transform: 'scale(1, 1)'
}));

const BannersSkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Skeleton variant='rounded' width='100%' height={500} />
      </Grid>
    </Grid>
  );
};

export default BannersSkeleton;
