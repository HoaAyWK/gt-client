import React from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';

import { ProductReview } from '../../components';
import ACTION_STATUS from '../../../../constants/actionStatus';

const ProductReviews = ({ reviews, status }) => {

  if (status === ACTION_STATUS.IDLE ||
      status === ACTION_STATUS.LOADING) {
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === ACTION_STATUS.FAILED) {
    return <></>;
  }

  return (
    <Stack spacing={0}>
      {reviews.map((review) => (
        <ProductReview key={review?.id} review={review} />
      ))}
    </Stack>
  );
};

export default ProductReviews;
