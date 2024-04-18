import React, { useState } from 'react';
import { Button, Grid, Box, Typography, Stack, Rating } from '@mui/material';
import { useSelector } from 'react-redux';

import { StyledAvatar } from './styles';
import { Iconify } from '../../../components';
import { fToNow } from '../../../utils/formatTime';
import { createMarkup } from '../../../utils/sanitizeHtml';
import { EditProductReviewDialog } from '../../common/product-reviews';

const ProductReview = ({ review }) => {
  const { user } = useSelector((state) => state.auth);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);

  const handleOpenReviewDialog = () => {
    setOpenReviewDialog(true);
  };

  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(false);
  };

  return (
    <Grid container spacing={2} sx={{ my: 1 }}>
      <Grid item xs={3} lg={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alginItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <StyledAvatar src={review.owner.avatarUrl} />
            <Stack spacing={0.2} justifyContent='center' alignItems='center'>
              <Typography variant='body1' color='text.primary'>
                {review.owner.firstName + " " + review.owner.lastName}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {fToNow(review.createdDateTime)}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={9} lg={10}>
        <Stack spacing={1} sx={{ mt: 1 }}>
          <Stack spacing={1.5} direction='row' alignItems='center'>
            <Rating value={review.rating} readOnly />
            <Box
              sx={{
                display: 'flex',
                alginItems: 'center',
                color: 'success.main'
              }}
            >
              <Iconify icon='mdi:tick-decagram' width={24} height={24} />
              <Typography variant='subtitle2' color='success.main' sx={{ ml: 0.5 }}>
                Verified purchase
              </Typography>
            </Box>
          </Stack>
          <Typography
            variant='body2'
            color='text.secondary'
            dangerouslySetInnerHTML={createMarkup(review.content)}
          />
          <Stack direction='row' spacing={2}>
            <Button>
              <Iconify icon='mdi:like' width={20} height={20} />
              &nbsp;
              Like
            </Button>
            {review.owner.id === user?.id && (
              <Button onClick={handleOpenReviewDialog}>
                <Iconify icon='eva:edit-outline' width={20} height={20} />
                &nbsp;
                Edit
              </Button>
            )}
          </Stack>
        </Stack>
        <EditProductReviewDialog
          dialogTitle='Edit Review'
          open={openReviewDialog}
          handleClose={handleCloseReviewDialog}
          review={review}
        />
      </Grid>
    </Grid>
  );
};

export default ProductReview;
