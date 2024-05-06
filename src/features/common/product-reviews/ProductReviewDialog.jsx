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
import { addReview } from './productReviewSlice';

const ProductReviewDialog = (props) => {
  const { dialogTitle, dialogContent, open, handleClose, orderId, productId, variant } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { addReviewStatus } = useSelector((state) => state.productReviews);

  const ReviewSchema = Yup.object().shape({
    rating: Yup.number()
      .required('Rating is required.')
      .min(1, "Rating is required."),
    content: Yup.string()
      .required('Content is required.')
  });

  const defaultValues = {
    rating: 0,
    content: ''
  };

  const methods = useForm({
    resolver: yupResolver(ReviewSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    data.id = productId;
    data.productId = productId;

    if (variant) {
      data.productVariantId = variant.id;
    }

    const actionResult = await dispatch(addReview(data));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar('Created successfully', { variant: 'success' });
      handleClose();
      reset();

      return;
    }

    if (result.errors) {
      const errorKeys = Object.keys(result.errors);
      errorKeys.forEach((key) => {
        result.errors[key].forEach(error => {
          enqueueSnackbar(error, { variant: "error" });
        }
      )});

      return;
    }

    enqueueSnackbar(result.error, { variant: "error" });
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
              <RHFRating name='rating' />
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
              loading={addReviewStatus === ACTION_STATUS.LOADING ? true : false}
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
