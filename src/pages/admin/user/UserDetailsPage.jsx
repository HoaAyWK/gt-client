import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Box, Button, Breadcrumbs, Container, Grid, Link, Stack, Typography } from '@mui/material';

import { UserDetails } from '../../../features/admin/users';
import { Page, Iconify } from '../../../components';
import { useResponsive } from '../../../hooks';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'User', path: '/admin/users' },
  { label: 'Details' },
];

const UserDetailsPage = () => {
  const { id } = useParams();
  const isMd = useResponsive('up', 'md');

  return (
    <Page title='Users'>
      <Container maxWidth='xl'>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Grid container sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography variant='h4' component='h1'>
                  User Details
                </Typography>
                <Breadcrumbs
                  separator={<Iconify icon='material-symbols:navigate-next' width={20} height={20} />}
                  aria-label='breadcrumb'
                >
                  {breadcrumbs.map((bc) => (
                    bc?.path ? (
                      <Link underline='hover' key={bc.label} color='inherit' component={RouterLink} to={bc.path}>
                        {bc.label}
                      </Link>
                    ) : (
                      <Typography variant='body1' color='text.primary' key={bc.label}>{bc.label}</Typography>
                    )
                  ))}
                </Breadcrumbs>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isMd ? 'flex-end' : 'flex-start',
                  height: '100%',
                  ...(!isMd && {
                    mt: 1
                  })
                }}
              >
                {/* <Stack spacing={2} direction='row'>
                  <Button LinkComponent={RouterLink} to='/admin/users/edit' color='primary' variant='text'>
                    <Stack spacing={1} direction='row'>
                      <Iconify icon='eva:edit-outline' width={24} height={24} />
                      <Typography variant='button'>
                        Edit
                      </Typography>
                    </Stack>
                  </Button>
                  <Button LinkComponent={RouterLink} to='/admin/users/ban' color='inherit' variant='text'>
                    <Stack spacing={1} direction='row'>
                      <Iconify icon='mdi:ban' width={24} height={24} />
                      <Typography variant='button'>
                        Ban
                      </Typography>
                    </Stack>
                  </Button>
                  <Button LinkComponent={RouterLink} to='/admin/users/delete' color='error' variant='text'>
                    <Stack spacing={1} direction='row'>
                      <Iconify icon='eva:trash-2-outline' width={24} height={24} />
                      <Typography variant='button'>
                        Delete
                      </Typography>
                    </Stack>
                  </Button>
                </Stack> */}
              </Box>
            </Grid>
          </Grid>
          <UserDetails id={id} />
        </Box>
      </Container>
    </Page>
  );
};

export default UserDetailsPage;
