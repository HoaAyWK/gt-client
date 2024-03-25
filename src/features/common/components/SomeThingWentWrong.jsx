import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';

import { getProductsPerCategory } from '../productDetailsSlice';
import wrong from '../../../assets/images/wrong.png';

const SomeThingWentWrong = () => {
  const dispatch = useDispatch();

  const handleClickTryAgain = () => {
    dispatch(getProductsPerCategory());
  };

  return (
    <Box
      sx={{
        width: '100%',
        py: 5,
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center'
      }}
    >
      <Box>
        <Box
          component='img'
          src={wrong}
          alt='something went wrong'
          sx={{
            width: 240,
            height: 240,
            objectFit: 'cover',
            mb: 2
          }}
        />
        <Typography variant='subtitle1' textAlign='center'>
          Something went wrong.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', mt: 2 }}>
          <Button size='small' variant='outlined' color='primary' onClick={handleClickTryAgain}>
            Try again
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SomeThingWentWrong;
