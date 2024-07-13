import React from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';

import { ProductReview } from '../../components';

const ProductReviews = ({ reviews, variant }) => {
  return (
    <Stack spacing={0}>
      {reviews.map((review) => (
        <ProductReview key={review.id} review={review} variant={variant} />
      ))}
    </Stack>
  );
};

export default ProductReviews;
