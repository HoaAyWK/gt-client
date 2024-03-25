import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Avatar, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Iconify } from '../../components';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    width: 96,
    height: 96
  },
  [theme.breakpoints.up('md')]: {
    width: 180,
    height: 180,
  }
}));

const StyledBoxName = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  [theme.breakpoints.up('xs')]: {
    justifyContent: 'flex-start',
    marginLeft: 16
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'center',
    marginTop: 16
  }
}));

const StyledBoxAvatar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('xs')]: {
    flexDirection: 'row'
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'column',
    justifyContent: 'center',
  }
}));

const AccountCard = () => {
  const { user } = useSelector((state) => state.auth);


  return (
    <Box>
      <StyledBoxAvatar
        sx={{ mb: 2 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <StyledAvatar src={user?.avatar} />
        </Box>
        <StyledBoxName>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h6' color='text.primary' sx={{ mr: 1 }}>{`${user?.firstName} ${user?.lastName}`}</Typography>
            {user?.gender === 'Male' ? (
              <Iconify icon='mdi:gender-male' width={24} height={24} />
            ) : (
              <Iconify icon='mdi:gender-female' width={24} height={24} />
            )}
          </Box>
          <Typography vairant='subittle2' color='text.secondary'>{user?.email}</Typography>
        </StyledBoxName>
      </StyledBoxAvatar>
      <Button
        fullWidth
        color='inherit'
        variant='contained'
        disableElevation
        LinkComponent={RouterLink}
        to='/settings/profile'
        sx={{
          boxShadow: 'none'
        }}
      >
        Edit Profile
      </Button>
    </Box>
  );
};

export default AccountCard;
