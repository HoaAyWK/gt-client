import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import { Iconify } from '../../../../components';
import { fToNow } from '../../../../utils/formatTime';
import { deleteFavorite } from '../../../common/productFavoriteSlice';

const ProductFavorite = ({ favorite }) => {
  const { productName, image, totalHeart, createdAt, id, productId } = favorite;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = async () => {
    try {
      const actionResult = await dispatch(deleteFavorite(id));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar('Unfavorite successfully', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Stack spacing={1} direction='row'>
        <Box
          component='img'
          src={image}
          alt={productName}
          sx={{
            width: 56,
            height: 56,
            objectFit: 'cover',
            borderRadius: 1
          }}
        />
        <Stack spacing={0.5}>
          <Link component={RouterLink} to={`/products/${productId}`} underline='none' color='inherit'>
            <Typography variant='subtitle1'>{productName}</Typography>
          </Link>
          <Stack spacing={3} direction='row'>
            <Stack spacing={1} direction='row'>
              <Iconify icon='mdi:cards-heart' width={20} height={20} sx={{ color: 'text.secondary' }} />
              <Typography variant='body2' color='text.secondary'>{totalHeart}</Typography>
            </Stack>
            <Typography variant='body2' color='text.secondary'>{fToNow(createdAt)}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Button variant='outlined' color='inherit' size='small' onClick={handleClick}>
        <Iconify icon='mdi:cards-heart' width={20} height={20} color='#ff4842' />
        &nbsp;
        &nbsp;
        <Typography variant='button'>Favorited</Typography>
      </Button>
    </Box>
  );
};

export default ProductFavorite;
