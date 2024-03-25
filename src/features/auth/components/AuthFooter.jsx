import React from 'react'
import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const AuthFooter = ({ action }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 'calc(100% - 2rem)',
        left: 0,
        right: 0,
        textAlign: 'center'
      }}
    >
      <Typography variant='body2' color='text.secondary' component='span'>
        By {action} HCI, you agree to our
      </Typography>
      &nbsp;
      <Link component={RouterLink} to='/terms-of-service' color='text.primary'>
        <Typography variant='body2' color='text.primary' component='span'>
          terms of service
        </Typography>
      </Link>
    </Box>
  );
};

export default AuthFooter;
