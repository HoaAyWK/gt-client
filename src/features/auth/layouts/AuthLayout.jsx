import React from 'react';
import { Box, Container, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import hciLogo from '/new_hci_logo.svg';

const AuthLayout = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100%', overflow: 'hidden' }}>
      <Container maxWidth='xs' sx={{ minHeight: '100%' }}>
        <Box
          sx={{
            mt: 8, display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 4
            }}
        >
          <Link component={RouterLink} to='/' underline='none' color='text.primary'>
            <Box
              component='img'
              src={hciLogo}
              alt='logo'
              sx={{
                width: 64,
                height: 64
              }}
            />
          </Link>
        </Box>
        {children}
      </Container>
    </Box>
  );
};

export default AuthLayout;
