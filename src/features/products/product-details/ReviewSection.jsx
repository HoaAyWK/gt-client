import React, { useEffect, useState, useMemo } from 'react';
import { Box, Button, CircularProgress, Grid, LinearProgress, Stack, Typography, Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { Iconify } from '../../../components';
import MessageForEmptyItem from './components/MessageForEmptyItem';
import { StyledPaper } from '../components/styles';
import { ProductReviewDialog } from '../../common/product-reviews';
import { fShortenNumber2 } from '../../../utils/formatNumber';
import ACTION_STATUS from '../../../constants/actionStatus';
import ProductReviews from './product-reviews/ProductReviews';
import { getProductReviewsByProductId, refresh } from '../../common/product-reviews/productReviewSlice';
import discuss from '../../../assets/images/discuss.png';

const ReviewSection = ({ id, productSingle, user }) => {
  const dispatch = useDispatch();
  const [openReview, setOpenReview] = useState(false);
  const { reviews, getReviewsStatus, createReviewStatus } = useSelector((state) => state.productReviews);
  const reviewStats = useMemo(() => {
    if (reviews?.stats) {
      return reviews.stats.toReversed();
    }

    return [];
  });


  // useEffect(() => {
  //   dispatch(getProductReviewsByProductId(id));
  // }, [id]);

  // useEffect(() => {
  //   if (createReviewStatus === ACTION_STATUS.SUCCEEDED) {
  //     dispatch(getProductReviewsByProductId(id));
  //     dispatch(refresh());
  //   }
  // }, [createReviewStatus]);

  const handleCloseReview = () => {
    setOpenReview(false);
  };

  const handleOpenReview = () => {

    setOpenReview(true);
  };

  if (getReviewsStatus === ACTION_STATUS.IDLE ||
    getReviewsStatus === ACTION_STATUS.LOADING) {

    return (
      <Box sx={{ py: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

if (getReviewsStatus === ACTION_STATUS.FAILED) {
  return <></>;
}

  return (
    <Box
      sx={{ width: '100%', my: 4 }}
    >
      <StyledPaper>
        {productSingle?.averageRating > 0 && (
          <Grid container spacing={2}
            sx={{
              borderBottom: (theme) => `1px dashed ${theme.palette.divider}`,
              mb: 4
            }}
          >
            <Grid item xs={12}>
              <Box
                sx={{
                  background: (theme) => theme.palette.background.neutral,
                  width: '100%',
                  p: 2
                }}
              >
                <Typography variant='h6' component='h1'>Reviews</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}
              sx={{
                borderRight: (theme) => `1px dashed ${theme.palette.divider}`,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  my: 3
                }}
              >
                <Typography variant='subtitle1' color='text.secondary' fontWeight='bold'>
                  Average Rating
                </Typography>
                {/* <Typography variant='h2' color='text.primary' sx={{ my: 1 }}>
                  {fShortenNumber2(productSingle.averageRating)}/5
                </Typography>
                <Stack spacing={0.5}>
                  <Rating readOnly value={productSingle.averageRating} precision={0.5} />
                  <Typography variant='caption' color='text.secondary' textAlign='center'>
                    {`(${productSingle.numReviews} ${productSingle.numReviews > 1 ? 'reviews' : 'review'})`}
                  </Typography>
                </Stack> */}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              {getReviewsStatus === ACTION_STATUS.SUCCEEDED && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alginItems: 'center',
                    my: 2
                  }}
                >
                  <Stack spacing={1}>
                    {reviewStats.map((rating) => (
                      <Stack spacing={2} direction='row' key={rating.name} alignItems='center'>
                        <Typography variant='subtitle1' color='text.primary'>
                          {rating.value} &nbsp; Star
                        </Typography>
                        <LinearProgress color='inherit' variant='determinate' value={rating.total / productSingle.numReviews * 100} sx={{ minWidth: 200 }} />
                        <Typography variant='subtitle1' color='text.secondary'>
                          {rating.total}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={4}
              sx={{
                borderLeft: (theme) => `1px dashed ${theme.palette.divider}`,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  mb: 4
                }}
              >
                <Button variant='outlined' color='inherit' size='large' onClick={handleOpenReview}>
                  <Iconify icon='eva:edit-outline' width={24} height={24} />
                  &nbsp;
                  Write your review
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
        <ProductReviewDialog
          dialogTitle='Write Review'
          open={openReview}
          handleClose={handleCloseReview}
          isEdit={false}
          productId={id}
        />
        <Box sx={{ px: 2, pb: 2 }}>
          {/* {reviews.reviews.length === 0 ? (
              !user && (
                <MessageForEmptyItem image={discuss} message='This product does not have any reviews.' />
              )
            ) : (
              <>
                <ProductReviews reviews={reviews.reviews} status={getReviewsStatus} />
              </>
            )} */}
        </Box>
        {productSingle.canReview && reviews.reviews.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2
            }}
          >
            <Stack spacing={1}>
              <Typography variant='body1' textAlign='center'>Let's be the first ones who write a review</Typography>
              <Button variant='outlined' color='inherit' size='large' onClick={handleOpenReview}>
                <Iconify icon='eva:edit-outline' width={24} height={24} />
                &nbsp;
                Write your review
              </Button>
            </Stack>
          </Box>
        )}
      </StyledPaper>
    </Box>
  );
};

export default ReviewSection;
