import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Button, Container, Link, Stack, Typography } from '@mui/material';

import { Iconify, Page } from '../../../components';

const AdminPageLayout = ({
  pageTitle,
  pageHeaderName,
  breadcrumbs,
  showCreateButton,
  createWithDialog,
  onOpenDialog,
  createPath,
  createName,
  children }) => {

    return (
    <Page title={pageHeaderName}>
      <Container maxWidth='xl'>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 5
          }}
          >
            <Stack spacing={1}>
              <Typography variant='h4' component='h1'>
                {pageTitle}
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
            {showCreateButton && !createWithDialog && (
              <Button LinkComponent={RouterLink} to={createPath} color='primary' variant='contained'>
                <Stack spacing={1} direction='row'>
                  <Iconify icon='eva:plus-fill' width={24} height={24} />
                  <Typography variant='button'>
                    New {createName}
                  </Typography>
                </Stack>
              </Button>
            )}
            {showCreateButton && createWithDialog && (
              <Button color='primary' variant='contained' onClick={onOpenDialog}>
                <Stack spacing={1} direction='row'>
                  <Iconify icon='eva:plus-fill' width={24} height={24} />
                  <Typography variant='button'>
                    New {createName}
                  </Typography>
                </Stack>
              </Button>
            )}
          </Box>
          <Box sx={{ mt: 4 }}>
            {children}
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default AdminPageLayout;
