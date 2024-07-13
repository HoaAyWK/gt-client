import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogActions, DialogTitle, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { unwrapResult } from '@reduxjs/toolkit';

import { FormProvider, RHFRating, RHFEditor, RHFTextField } from '../../../components/hook-form';
import ACTION_STATUS from '../../../constants/actionStatus';
import { editReview } from '../../products/productSlice';

const EditProductReviewDialog = (props) => {
  const { dialogTitle, dialogContent, open, handleClose, review, variant } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [initialContent, setInitialContent] = useState(review.content);
  const { product, editReviewStatus } = useSelector(state => state.products);

  const ReviewSchema = Yup.object().shape({
    reviewId: Yup.string(),
    rating: Yup.number()
      .required('Rating is required.')
      .min(1, "Rating is required."),
    content: Yup.string()
      .required('Content is required.')
  });

  const defaultValues = {
    reviewId: review.id,
    rating: review.rating,
    content: review.content,
  };

  const methods = useForm({
    resolver: yupResolver(ReviewSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
      data.productId = product.id;
      data.productVariantId = variant?.id;

      const actionResult = await dispatch(editReview(data));
      const result = unwrapResult(actionResult);

      if (result.success) {
        enqueueSnackbar('Updated successfully', { variant: 'success' });
        // dispatch(getProductReviewsByProductId(review.productId));
        handleClose();
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
            <RHFTextField name='reviewId' type='hidden' sx={{ display: 'none' }} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body1'>Your review about this product: &nbsp;</Typography>
              <RHFRating name='rating' />
            </Box>
            <RHFEditor name='content' label='Content' initialContent={initialContent} />
          </Stack>
        </Box>
        <DialogActions>
          <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
            <Button variant='contained' color='inherit' onClick={onCancel}>Cancel</Button>
            <LoadingButton
              variant='contained'
              color='primary'
              type='submit'
              loading={editReviewStatus === ACTION_STATUS.LOADING ? true : false}
            >
              Edit Review
            </LoadingButton>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default EditProductReviewDialog;
