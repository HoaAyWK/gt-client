import React, { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { alpha, styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, IconButton, Link, Stack, Rating, Tooltip, Typography } from '@mui/material';

import { Cover, Label, Iconify } from '../../../components';
import { fCurrency } from '../../../utils/formatNumber';
import { Highlight } from 'react-instantsearch-hooks-web';
import { createFavorite, deleteFavorite } from '../../common/productFavoriteSlice';
import { addToCart } from '../../common/cartSlice';
import { useLocalStorage } from '../../../hooks';

const StyledDefaultIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[900], 0.08),
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[900], 0.32)
  },
}));

const StyledRedIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.error.main, 0.08),
  color: theme.palette.error.main,
  '&:hover': {
    backgroundColor: alpha(theme.palette.error.main, 0.32)
  },
}));

const SearchHit = ({ hit, sendEvent, favorites }) => {
  const {
    objectID,
    name,
    price,
    finalPrice,
    discount,
    image,
    averageRating,
    numRatings,
    attributes
  } = hit;
  const dispatch = useDispatch();
  const [localCart] = useLocalStorage('cart', null);
  const user = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const hasDiscount = useMemo(() => {
    return finalPrice !== price;
  }, [finalPrice, price]);

  const isFavorite = useMemo(() => {
    if (favorites) {
      for (let favorite of favorites) {
        if (favorite.productId === objectID) {
          return true;
        }
      }

      return false;
    }

    return false;
  }, [favorites]);

  const favoriteId = useMemo(() => {
    if (favorites) {
      for (let favorite of favorites) {
        if (favorite.productId === objectID) {
          return favorite.id;
        }
      }

      return undefined;
    }

    return undefined;
  }, [favorites]);

  const handleClickAddToCart = async () => {
    sendEvent('conversion', hit, 'Add to cart');
    try {
      const actionResult = await dispatch(addToCart({ productId: hit.objectID, quantity: 1, userId: localCart }));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar('Added 1 item to your cart', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleClickHeart = async () => {
    try {
      if (!isFavorite && !user) {
        enqueueSnackbar('Please login first!');
        return;
      }

      if (!isFavorite) {
        const actionResult = await dispatch(createFavorite({ productId: objectID }));
        const result = unwrapResult(actionResult);

        if (result) {
          enqueueSnackbar('Favorite successfully', { variant: 'success' });
        }
      } else {
        if (!favoriteId) {
          enqueueSnackbar('Something went wrong.', { variant: 'error' });
          return;
        }

        const actionResult = await dispatch(deleteFavorite(favoriteId));
        const result = unwrapResult(actionResult);

        if (result) {
          enqueueSnackbar('Remove favorite successfully', { variant: 'success' });
        }
      }

    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 1,
        p: 0,
        position: 'relative',
        '&:hover .card-action': {
          opacity: 1,
          visibility: 'visible',
        },
        boxShadow: (theme) => theme.shadows[1],
        backgroundColor: (theme) => theme.palette.background.paper,
        '&:hover': {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }
      }}
      onClick={() => sendEvent('click', hit, 'Product hit Clicked')}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Box
          sx={{
            zIndex: 9,
            top: 8,
            left: 8,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
        >
          {discount && (
            <Label variant='filled' color='error'>
              {discount.usePercentage
                ? `-${discount.discountPercentage * 100}%`
                : `-${fCurrency(discount.discountAmount)}`}
            </Label>
          )}
        </Box>
      {isFavorite ? (
          <StyledRedIconButton
            size='small'
            onClick={handleClickHeart}
            aria-label='favorite'
            sx={{
              zIndex: 9,
              top: 8,
              right: 8,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            <Iconify icon='mdi:cards-heart' width={24} height={24} />
          </StyledRedIconButton>
        ) : (
          <StyledDefaultIconButton
            size='small'
            onClick={handleClickHeart}
            aria-label='favorite'
            sx={{
              zIndex: 9,
              top: 8,
              right: 8,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            <Iconify icon='mdi:cards-heart' width={24} height={24} />
          </StyledDefaultIconButton>
        )}
        <Link component={RouterLink} to={`/products/${objectID}`}>
          <Cover
            src={image}
            alt={name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              borderTopLeftRadius: (theme) => theme.shape.borderRadius,
              borderTopRightRadius: (theme) => theme.shape.borderRadius,
              top: 0
            }}
          />
        </Link>
      </Box>
      <Stack spacing={0.5} sx={{ px: 2, py: 2 }}>
        <Tooltip title={name}>
          <Link color="inherit" underline="hover" component={RouterLink} to={`/products/${objectID}`}>
            <Typography variant="subtitle2" noWrap>
              <Highlight hit={hit} attribute='name' />
            </Typography>
          </Link>
        </Tooltip>
        <Stack spacing={0.5} direction='row' sx={{ mb: 1 }}>
          {Object.keys(attributes).slice(0, 3).map(key => (
            <Box
              key={key}
              sx={{
                borderRadius: theme => theme.spacing(0.5),
                border: theme => `1px solid ${theme.palette.primary.main}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 1
              }}
            >
              <Typography variant='caption' color='primary'>{attributes[key]}</Typography>
            </Box>
          ))}
        </Stack>
        <Rating readOnly value={averageRating} size='small' precision={0.5} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" component='p' color='error'>
              {fCurrency(finalPrice)}
              &nbsp;
              {hasDiscount && (
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through',
                  }}
                >
                  {fCurrency(price)}
                </Typography>
              )}
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Box
        sx={{
          width: '100%',
          px: 2,
          pb: 2,
          position: 'absolute',
          top: '98%',
          left: 0,
          opacity: 0,
          visibility: 'hidden',
          zIndex: 10,
          backgroundColor: (theme) => theme.palette.background.paper,
          boxShadow: (theme) => theme.shadows[1],
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
        }}
        className='card-action'
      >
        <Stack spacing={0.5}>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleClickAddToCart}
          >
            {/* <Iconify icon='mdi:add-shopping-cart' width={24} height={24} />
            &nbsp; */}
            Add To Cart
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default SearchHit;
