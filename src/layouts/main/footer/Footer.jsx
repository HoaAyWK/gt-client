import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material';

import hciLogo from '/new_hci_logo.svg';
import vnpay from '../../../assets/icons/payments/ic_vnpay.svg';
import mastercard from '../../../assets/icons/payments/ic_mastercard.svg';
import visa from '../../../assets/icons/payments/ic_visa.svg';

const StyledTextLogo = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(.25turn, #7F0E0E, #0F0D73)',
  WebkitBackgroundClip: 'text',
  WebkitBackdropFilter: 'transparent'
}));

const LINKS = [
  { label: 'Home', path: '/'},
  { label: 'About', path: '/' },
  { label: 'Our Team', path: '/' }
];

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 120,
        backgroundColor: (theme) => theme.palette.background.default,
        position: 'absolute',
        top: `calc(100% - 120px)`
      }}
    >
      <Container maxWidth='lg'>
        <Stack spacing={8} direction='row'>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box
              component='img'
              src={hciLogo}
              alt='logo'
              sx={{ mr: 0.5 }}
            />
            <Stack spacing={-1.5}>
              <StyledTextLogo variant='h6' component='h1'>HCI</StyledTextLogo>
              <Typography variant='h6' component='h1'>2023</Typography>
            </Stack>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Stack spacing={0.5}>
                {LINKS.map((link) => (
                  <Link key={link.label} underline='none' component={RouterLink} to={link.path}>
                    <Typography variant='subtitle2' color='text.secondary'>
                      {link.label}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Stack spacing={0.5}>
                <Typography variant='subtitle2' color='text.secondary'>
                  Support Payments
                </Typography>
                <Stack spacing={1} direction='row'>
                  <Box
                    component='img'
                    src={vnpay}
                    alt='vnpay'
                    sx={{
                      width: 32,
                      height: 32
                    }}
                  />
                  <Box
                    component='img'
                    src={mastercard}
                    alt='mastercard'
                    sx={{
                      width: 32,
                      height: 32
                    }}
                  />
                  <Box
                    component='img'
                    src={visa}
                    alt='visa'
                    sx={{
                      width: 32,
                      height: 32
                    }}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
