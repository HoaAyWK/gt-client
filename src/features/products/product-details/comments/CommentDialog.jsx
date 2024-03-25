import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import ACTION_STATUS from '../../../../constants/actionStatus';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { createComment } from './commentSlice';

const CommentDialog = () => {
  const { dialogTitle, dialogContent, open, handleClose } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { createCommentStatus } = useSelector((state) => state.comments);

  const ReviewSchema = Yup.object().shape({
    content: Yup.string().required('Content is requried')
  });

  const defaultValues = {
    content: ''
  };

  const methods = useForm({
    resolver: yupResolver(ReviewSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    console.log(data);
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
            <RHFTextField name='content' label='Content' multiline minRows={2} />
          </Stack>
        </Box>
        <DialogActions>
          <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
            <Button variant='contained' color='inherit' onClick={onCancel}>Cancel</Button>
            <LoadingButton
              variant='contained'
              color='primary'
              type='submit'
              loading={createCommentStatus === ACTION_STATUS.LOADING ? true : false}
            >
              Comment
            </LoadingButton>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default CommentDialog;
