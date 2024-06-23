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
import discuss from '../../../assets/images/discuss.png';

// const REVIEWS = [
//   {
//     id: 1,
//     title: 'nice',
//     content: 'good product',
//     rating: 5,
//     createdDateTime: '2021-10-10T10:00:00Z',
//     owner: {
//       id: 1,
//       firstName: 'John',
//       lastName: 'Doe',
//       avatarUrl: 'https://randomuser.me/api/portraits'
//     },
//     comments: [
//       {
//         content: 'Thank you for your review',
//         createdDateTime: '2021-10-10T10:00:00Z',
//         owner: {
//           id: 2,
//           firstName: 'Jane',
//           lastName: 'Doe',
//           avatarUrl: 'https://randomuser.me/api/portraits'
//         }
//       }
//     ]
//   },
//   {
//     id: 2,
//     title: 'good',
//     content: 'good product',
//     rating: 4,
//     createdDateTime: '2021-10-10T10:00:00Z',
//     owner: {
//       id: 2,
//       firstName: 'Jane',
//       lastName: 'Doe',
//       avatarUrl: 'https://randomuser.me/api/portraits'
//     },
//     comments: []
//   }
// ];

const ReviewSection = ({ id, product, variant, canReview }) => {
  const dispatch = useDispatch();
  const [openReview, setOpenReview] = useState(false);

  const averageRating = useMemo(() => {
    if (variant) {
      return variant.averageRating ? variant.averageRating.value : 0;
    }

    return product?.averageRating ? product.averageRating.value : 0;
  }, [variant]);

  const numRatings = useMemo(() => {
    if (variant) {
      return variant.averageRating ? variant.averageRating.numRatings : 0;
    }

    return product?.averageRating ? product.averageRating.numRatings : 0;
  }, [variant]);

  const reviews = useMemo(() => {
    if (product) {
      return product.reviews;
    }

    return [];
  }, [product]);

  const reviewStats = useMemo(() => {
    let stats = [
      { 'value': 1, 'total': 0 },
      { 'value': 2, 'total': 0 },
      { 'value': 3, 'total': 0 },
      { 'value': 4, 'total': 0 },
      { 'value': 5, 'total': 0 }
    ];

    if (reviews.length === 0) {
      return stats.reverse();
    }

    if (!variant) {
      return stats.reverse();
    }

    const variantReviews = reviews.filter(review =>
      JSON.stringify(review.attributeSelection) === JSON.stringify(variant.attributeSelection));

    for (let i = 1; i <= 5; i++) {
      variantReviews.forEach(review => {
        if (review.rating === i) {
          stats[i - 1].total += 1;
        }
      });
    }

    return stats.reverse();
  }, [reviews, variant]);

  const handleCloseReview = () => {
    setOpenReview(false);
  };

  const handleOpenReview = () => {

    setOpenReview(true);
  };

  return (
    <Box
      sx={{ width: '100%', mt: 4, mb: 8 }}
    >
      <StyledPaper>
        {averageRating > 0 && (
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
                <Typography variant='h2' color='text.primary' sx={{ my: 1 }}>
                  {averageRating}/5
                </Typography>
                <Stack spacing={0.5}>
                  <Rating readOnly value={averageRating} precision={0.5} />
                  <Typography variant='caption' color='text.secondary' textAlign='center'>
                    {`(${numRatings} ${numRatings > 1 ? 'reviews' : 'review'})`}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alginItems: 'center',
                  my: 2
                }}
              >
                <Stack spacing={1} sx={{ pr: 2 }}>
                  {reviewStats.map((rating) => (
                    <Stack
                      spacing={2}
                      direction='row'
                      key={rating.value}
                      sx={{ alignItems: 'center', justifyContent: 'center' }}

                    >
                      <Typography variant='subtitle1' color='text.primary'>
                        {rating.value} &nbsp; Star
                      </Typography>
                      <LinearProgress color='inherit' variant='determinate' value={Math.ceil(rating.total / numRatings) * 100} sx={{ minWidth: 200 }} />
                      <Typography variant='subtitle1' color='text.secondary'>
                        {rating.total}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
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
          productId={product?.id}
          variant={variant}
        />
        <Box sx={{ px: 2, pb: 2 }}>
          {reviews.length === 0 ? (
              !canReview && (
                <MessageForEmptyItem image={discuss} message='This product does not have any reviews.' />
              )
            ) : (
              <>
                <ProductReviews reviews={reviews} />
              </>
            )}
        </Box>
        {reviews.length === 0 && canReview && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2
            }}
          >
            <Stack spacing={1}>
              <Typography variant='body1' textAlign='center'>Let's be the first one who writes a review</Typography>
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
