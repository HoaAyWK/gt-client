import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material';

import { Iconify } from '../../../components';
import hciLogo from '/new_hci_logo.svg';
import vnpay from '../../../assets/icons/payments/ic_vnpay.svg';
import mastercard from '../../../assets/icons/payments/ic_mastercard.svg';
import visa from '../../../assets/icons/payments/ic_visa.svg';

const StyledTextLogo = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(.25turn, #7F0E0E, #0F0D73)',
  WebkitBackgroundClip: 'text',
  WebkitBackdropFilter: 'transparent'
}));

const ABOUT_LINKS = [
  { label: 'About us', path: '/'},
  { label: 'Trade-in', path: '/' },
  { label: 'Student offer', path: '/' },
  { label: "Military program", path: '/' },
  { label: "We're hiring!", path: '/' }
];

const HELP_LINKS = [
  { label: 'Shipping & Returns', path: '/' },
  { label: 'Contact Us', path: '/' },
  { label: 'FAQs', path: '/' },
  { label: 'Protection plan', path: '/' },
];

const POLICY_LINKS = [
  { label: 'Privacy Policy', path: '/' },
  { label: 'Terms of Use', path: '/' },
  { label: 'Sales and Refunds', path: '/' },
];

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 240,
        backgroundColor: (theme) => theme.palette.background.default,
        position: 'absolute',
        top: `calc(100% - 240px)`
      }}
    >
      <Container maxWidth='lg'>
        <Stack spacing={8} direction='row'>
          <Box sx={{ pt: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Box
                component='img'
                src={hciLogo}
                alt='logo'
                sx={{ mr: 0.5, width: 28, height: 28 }}
              />
              <Stack spacing={-1.5}>
                <StyledTextLogo variant='h6' component='h1'>EStore</StyledTextLogo>
                <Typography variant='h6' component='h1'>2024</Typography>
              </Stack>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant='h6' color='text.primary' sx={{ mb: 1 }}>
                About
              </Typography>
              <Stack spacing={0.5}>
                {ABOUT_LINKS.map((link) => (
                  <Link key={link.label} underline='none' component={RouterLink} to={link.path}>
                    <Typography variant='subtitle2' color='text.secondary'>
                      {link.label}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h6' color='text.primary' sx={{ mb: 1 }}>
                Help
              </Typography>
              <Stack spacing={0.5}>
                {HELP_LINKS.map((link) => (
                  <Link key={link.label} underline='none' component={RouterLink} to={link.path}>
                    <Typography variant='subtitle2' color='text.secondary'>
                      {link.label}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h6' color='text.primary' sx={{ mb: 1 }}>
                Policy
              </Typography>
              {POLICY_LINKS.map((link) => (
                <Link key={link.label} underline='none' component={RouterLink} to={link.path}>
                  <Typography variant='subtitle2' color='text.secondary'>
                    {link.label}
                  </Typography>
                </Link>
              ))}
              <Stack spacing={0.5}>
                <Typography variant='subtitle2' color='text.secondary'>
                  Payments 100% secure
                </Typography>
                <Stack spacing={1} direction='row'>
                  <Box
                    component='img'
                    src={vnpay}
                    alt='vnpay'
                    sx={{
                      width: 28,
                      height: 28
                    }}
                  />
                  <Box
                    component='img'
                    src={mastercard}
                    alt='mastercard'
                    sx={{
                      width: 28,
                      height: 28
                    }}
                  />
                  <Box
                    component='img'
                    src={visa}
                    alt='visa'
                    sx={{
                      width: 28,
                      height: 28
                    }}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h6' color='text.primary' sx={{ mb: 1 }}>
                Contact
              </Typography>
              <Stack spacing={1} direction='row'>
                <Box sx={{ cursor: 'pointer' }}>
                  <Iconify icon='logos:facebook' color='#1877f2' width={28} height={28} />
                </Box>
                <Box sx={{ cursor: 'pointer' }}>
                  <Iconify icon='devicon:twitter' color='#1da1f2' width={28} height={28} />
                </Box>
                <Box sx={{ cursor: 'pointer' }}>
                  <Iconify icon='mdi:instagram' color='#c13584' width={28} height={28} />
                </Box>
                <Box sx={{ cursor: 'pointer' }}>
                  <Iconify icon='mdi:youtube' color='#ff0000' width={28} height={28} />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
