import React, { useEffect } from 'react';
import { Box, CircularProgress, Divider, Stack, Typography } from '@mui/material';

import { ProductFavorite } from './components';
import { Page } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFavorites, selectAllFavorites } from '../../common/productFavoriteSlice';
import ACTION_STATUS from '../../../constants/actionStatus';

const ProfileFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectAllFavorites);
  const { getFavoritesStatus } = useSelector((state) => state.favorites);

  useEffect(() => {
    if (getFavoritesStatus === ACTION_STATUS.IDLE) {
      dispatch(getMyFavorites());
    }
  }, []);

  if (getFavoritesStatus === ACTION_STATUS.IDLE ||
      getFavoritesStatus === ACTION_STATUS.LOADING) {
    return (
      <Box
        sx={{
          py: 4,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (getFavoritesStatus === ACTION_STATUS.FAILED) {
    return <></>
  }

  return (
    <Page title='Product favorites'>
      <Typography variant='h6' component='h1'>
        My Favorites
      </Typography>
      <Stack sx={{ my: 3 }} spacing={3}>
        {favorites.map((favorite, index) => (
          <>
            <ProductFavorite key={favorite.id} favorite={favorite} />
            {index < favorites.length - 1 && (
              <Divider />
            )}
          </>
        ))}
      </Stack>
    </Page>
  );
};

export default ProfileFavorites;
