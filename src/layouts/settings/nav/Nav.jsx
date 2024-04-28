import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Box, Link, Tooltip, Typography } from '@mui/material';

import { NavSection } from '../../../components';
import { StyledAccount } from './styles';
import navConfig from './config';

const Nav = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Box
      component='nav'
      sx={{
        flexShrink: { lg: 0 },
        width: '100%'
      }}
    >
      <Box
        sx={{ mb: 5, mx: 1 }}
      >
        <Link underline='none'>
          <StyledAccount>
            <Avatar src={user?.avatar} />

            <Box sx={{ ml: 2 }}>
              <Typography variant='subtitle2' sx={{ color: 'text.primary', mb: -0.5 }}>
                {`${user?.firstName} ${user?.lastName}`}
              </Typography>

              {user?.email?.length > 20 ? (
                <Tooltip title={user?.email}>
                  <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                    {user?.email?.slice(0, 20)}...
                  </Typography>
                </Tooltip>
              ) : (
              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                {user?.email}
              </Typography>)}
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />
    </Box>
  );
};

export default Nav;
