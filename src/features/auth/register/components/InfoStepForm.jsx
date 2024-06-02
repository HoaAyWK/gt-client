import React from 'react';
import { Box, Stack, Button, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormProvider, RHFDateTextField, RHFTextField } from '../../../../components/hook-form';
import { Iconify } from '../../../../components';
import ACTION_STATUS from '../../../../constants/actionStatus';

const InfoStepForm = (props) => {
  const { storedData, visible, handleBack, status, submit } = props;

  const InfoSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('LastName is required'),
    phone: Yup.string().required('Phone is required')
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    phone: '',
  };

  const methods = useForm({
    resolver: yupResolver(InfoSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const formData = { ...storedData, ...data };
    console.log(formData);
    await submit(formData);
  };

  const handleClickBack = () => {
    reset();
    handleBack();
  };

  return (
    <Box sx={{ display: visible ? 'block' : 'none' }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField name='firstName' label='First Name' />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name='lastName' label='Last Name' />
            </Grid>
          </Grid>
          <RHFTextField name='phone' label='Phone' />
        </Stack>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            pt: 4
          }}
        >
          <Stack spacing={1} direction='row'>
            <Button onClick={handleClickBack} color='inherit'>
              <Iconify icon='material-symbols:arrow-back-rounded' width={24} height={24} />
              &nbsp;
              Back
            </Button>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={status === ACTION_STATUS.LOADING ? true : false}
            >
              Sign up
            </LoadingButton>
          </Stack>
        </Box>
      </FormProvider>
    </Box>
  )
};

export default InfoStepForm;
