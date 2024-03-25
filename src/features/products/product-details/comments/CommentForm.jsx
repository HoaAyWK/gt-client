import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import ACTION_STATUS from '../../../../constants/actionStatus';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { createComment } from './commentSlice';


const CommentForm = ({ productId, replyUserId, reply, handleClose }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { createCommentStatus } = useSelector((state) => state.comments);

  const ReviewSchema = Yup.object().shape({
    content: Yup.string().required('Content is required')
  });

  const defaultValues = {
    content: ''
  };

  const methods = useForm({
    resolver: yupResolver(ReviewSchema),
    defaultValues
  });

  const { handleSubmit, reset, formState: { isDirty } } = methods;

  const showCancel = useMemo(() => {
    if (handleClose) {
      return true;
    }

    if (isDirty) {
      return true;
    }

    return false;
  }, [handleClose, isDirty]);

  const onSubmit = async (data) => {
    data.productId = productId;
    data.replyUserId = replyUserId;
    data.reply = reply;

    try {
      const actionResult = await dispatch(createComment(data));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar('Commented successfully', { variant: 'success' });
        reset();

      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const onCancel = () => {
    if (handleClose) {
      handleClose();
    }

    reset();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ mb: 1 }}>
          <RHFTextField
            name='content'
            label='Content'
            multiline minRows={2}
            placeholder='Write comment...'
          />
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
            {showCancel && (
              <Button color='inherit' onClick={onCancel}>Cancel</Button>
            )}
            <LoadingButton
              variant='contained'
              color='primary'
              type='submit'
              loading={createCommentStatus === ACTION_STATUS.LOADING ? true : false}
            >
              Comment
            </LoadingButton>
          </Stack>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default CommentForm;
