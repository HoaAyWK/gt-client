import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import ACTION_STATUS from '../../../constants/actionStatus';
import { FormProvider, RHFEditor, RHFRating } from '../../../components/hook-form';
import { createProductReview } from './productReviewSlice';

const ProductReviewDialog = (props) => {
  const { dialogTitle, dialogContent, open, handleClose, orderId, productId } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { createReviewStatus } = useSelector((state) => state.productReviews);

  const ReviewSchema = Yup.object().shape({
    stars: Yup.number()
      .required('Rating is required')
      .min(1, "Rating is required"),
    content: Yup.string()
      .required('Content is required')
  });

  const defaultValues = {
    stars: 0,
    content: ''
  };

  const methods = useForm({
    resolver: yupResolver(ReviewSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    data.orderId = orderId;
    data.productId = productId;
    try {
      const actionResult = await dispatch(createProductReview(data));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar('Created successfully', { variant: 'success' });
        handleClose();
        reset();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const onCancel = () => {
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='md'>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogContent && (<DialogContent>{dialogContent}</DialogContent>)}
        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body1'>Your review about this product: &nbsp;</Typography>
              <RHFRating name='stars' />
            </Box>
            <RHFEditor name='content' label='Content' />
          </Stack>
        </Box>
        <DialogActions>
          <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
            <Button variant='contained' color='inherit' onClick={onCancel}>Cancel</Button>
            <LoadingButton
              variant='contained'
              color='primary'
              type='submit'
              loading={createReviewStatus === ACTION_STATUS.LOADING ? true : false}
            >
              Post Review
            </LoadingButton>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default ProductReviewDialog;
