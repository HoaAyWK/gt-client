import React from 'react';
import { Box, Typography } from '@mui/material';

const MessageForEmptyItem = ({ image, message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        py: 2,
      }}
    >
      <Box
        component='img'
        alt='image'
        src={image}
        sx={{
          width: 175,
          height: 200,
          objectFit: 'cover',
          mb: 2,
        }}
      />
      <Typography variant='body1' textAlign='center' color='text.secondary'>
        {message}
      </Typography>
    </Box>
  )
}

export default MessageForEmptyItem
