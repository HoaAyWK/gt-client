import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { FormProvider, RHFTextField } from '../../../../../components/hook-form';
import { editComment } from '../commentSlice';
import { LoadingButton } from '@mui/lab';
import ACTION_STATUS from '../../../../../constants/actionStatus';

const EditForm = ({ comment, finishEdit }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { editCommentStatus } = useSelector((state) => state.comments);

  const EditCommentSchema = Yup.object().shape({
    id: Yup.string(),
    content: Yup.string().required('Content is required')
  });

  const defaultValues = {
    id: comment.id,
    content: comment.content
  };

  const methods = useForm({
    resolver: yupResolver(EditCommentSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {

    try {
      const actionResult = await dispatch(editComment(data));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar('Edit successfully', { variant: 'success' });
        finishEdit();
      }
    } catch(error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Box sx={{ pt: 1, width: '100%' }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name='id' type='hidden' sx={{ display: 'none' }} />
        <Stack spacing={1}>
          <RHFTextField name='content' label='Content' multiline rows={2} fullWidth />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Stack direction='row' spacing={1}>
              <Button variant='contained' color='inherit' onClick={finishEdit} size='small'>
                Cancel
              </Button>
              <LoadingButton
                variant='contained'
                color='primary'
                size='small'
                type='submit'
                loading={editCommentStatus === ACTION_STATUS.LOADING ? true : false}
              >
                Edit
              </LoadingButton>
            </Stack>
          </Box>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default EditForm;
