import React, { useState } from 'react';
import { Box, Button, Stack, InputAdornment, IconButton, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Iconify } from '../../../../components';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';

const CredentialsStepForm = (props) => {
  const { storeData, handleNext, visible } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const CredentialSchema = Yup.object().shape({
    email: Yup.string().required('Email is required')
    .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password must match Password'),
  });

  const defaultValues = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  const methods = useForm({
    resolver: yupResolver(CredentialSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    storeData(data);
    handleNext();
  };

  return (
    <Box sx={{ display: visible ? 'block' : 'none' }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <RHFTextField name='email' label='Email' />
          <RHFTextField
            name='password'
            type={showPassword ? 'text' : 'password' }
            label='Password'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <RHFTextField
            name='confirmPassword'
            type={showConfirmPassword ? 'text' : 'password' }
            label='Confirm Password'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge='end'>
                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Stack>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            pt: 4
          }}
        >
          <Stack spacing={2} direction='row'>
            <Link component={RouterLink} to='/login' underline='none'>
              <Button>
                Login instead
              </Button>
            </Link>
            <Button type='submit' variant='contained'>
              Next
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default CredentialsStepForm;
