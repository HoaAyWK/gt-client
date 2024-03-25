import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Skeleton, Stack, Box } from '@mui/material';

const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  transform: 'scale(1, 1)'
}));

const BannersSkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Skeleton variant='rounded' width='100%' height={400} />
      </Grid>
      <Grid item xs={12} md={5}>
        <Stack spacing={2}>
          {[0, 1, 2].map((sub) => (
            <StyledSkeleton key={sub} vairant='rounded' width='100%' height={120}/>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BannersSkeleton;
