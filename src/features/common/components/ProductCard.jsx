import React, { useMemo, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";

import { Cover, Iconify, Label } from "../../../components";
import { fCurrency } from "../../../utils/formatNumber";
import { addToCart } from "../cartSlice";
import { createFavorite, deleteFavorite } from "../productFavoriteSlice";
import ACTION_STATUS from "../../../constants/actionStatus";

const StyledDefaultIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[900], 0.08),
  "&:hover": {
    backgroundColor: alpha(theme.palette.grey[900], 0.32),
  },
}));

const StyledRedIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.error.main, 0.08),
  color: theme.palette.error.main,
  "&:hover": {
    backgroundColor: alpha(theme.palette.error.main, 0.32),
  },
}));

const ProductCard = ({ product, favorites, sendEvent }) => {
  const {
    objectID,
    productId,
    name,
    image,
    price,
    discount,
    averageRating,
    numRatings,
    finalPrice,
    hasVariant,
    attributes
  } = product;

  const [isBuyNowClicked, setIsBuyNowClicked] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addToCartStatus } = useSelector((state) => state.cart);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const hit = { ...product };
  const hasDiscount = useMemo(() => {
    return finalPrice !== price;
  }, [finalPrice, price]);

  const variantId = useMemo(() => {
    if (objectID === productId) {
      return null;
    }

    return objectID;
  }, [objectID, productId]);

  const pathToProductDetails = useMemo(() => {
    const url = `/products/${productId}`;
    if (hasVariant) {
      return `${url}/variants/${objectID}`;
    }
    return url;
  }, [objectID, productId, hasVariant]);

  const isFavorited = useMemo(() => {
    if (favorites) {
      for (let favorite of favorites) {
        if (favorite.productId === productId) {
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
        if (favorite.productId === productId) {
          return favorite.id;
        }
      }

      return undefined;
    }

    return undefined;
  }, [favorites]);

  const handleClickAddToCart = async () => {
    sendEvent("conversion", hit, "Add to cart");
    const actionResult = await dispatch(addToCart({
      productId: productId,
      productVariantId: variantId,
      quantity: 1 }));

    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar("Added to cart successfully", { variant: "success" });
      return;
    }

    if (result.errors) {
      const errorKeys = Object.keys(result.errors);
      errorKeys.forEach((key) => {
        result.errors[key].forEach(error => {
          enqueueSnackbar(error, { variant: "error" });
        }
      )});

      return;
    }

    enqueueSnackbar(result.error, { variant: "error" });
  };

  const handleClickBuyNow = async () => {
    setIsBuyNowClicked(true);
    sendEvent("conversion", hit, "Add to cart and view cart");
    const actionResult = await dispatch(addToCart({
      productId: productId,
      productVariantId: variantId,
      quantity: 1 }));
    const result = unwrapResult(actionResult);

    if (result.success) {
      setIsBuyNowClicked(false);
      navigate("/checkout");
      return;
    }

    if (result.errors) {
      const errorKeys = Object.keys(result.errors);
      errorKeys.forEach((key) => {
        result.errors[key].forEach(error => {
          enqueueSnackbar(error, { variant: "error" });
        }
      )});

      setIsBuyNowClicked(false);
      return;
    }

    enqueueSnackbar(result.error, { variant: "error" });
    setIsBuyNowClicked(false);
  };

  const handleClickHeart = async () => {
    try {
      if (!isFavorited && !user) {
        enqueueSnackbar("Please login first!");
        return;
      }

      if (!isFavorited) {
        const actionResult = await dispatch(
          createFavorite({ productId: productId })
        );
        const result = unwrapResult(actionResult);

        if (result) {
          enqueueSnackbar("Favorited successfully", { variant: "success" });
        }
      } else {
        if (!favoriteId) {
          enqueueSnackbar("Something went wrong.", { variant: "error" });
          return;
        }

        const actionResult = await dispatch(deleteFavorite(favoriteId));
        const result = unwrapResult(actionResult);

        if (result) {
          enqueueSnackbar("Remove favorite successfully", {
            variant: "success",
          });
        }
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 1,
        p: 0,
        position: "relative",
        "&:hover .card-action": {
          opacity: 1,
          visibility: "visible",
        },
        boxShadow: (theme) => theme.shadows[1],
        backgroundColor: (theme) => theme.palette.background.paper,
        "&:hover": {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
        transition: "all 0.3s ease-in-out 0s",
      }}
      onClick={() => sendEvent("click", hit, "Product Clicked")}
    >
      <Box sx={{ pt: "100%", position: "relative" }}>
        {isFavorited ? (
          <StyledRedIconButton
            size="small"
            onClick={handleClickHeart}
            aria-label="favorite"
            sx={{
              zIndex: 9,
              top: 8,
              right: 8,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            <Iconify icon="mdi:cards-heart" width={24} height={24} />
          </StyledRedIconButton>
        ) : (
          <StyledDefaultIconButton
            size="small"
            onClick={handleClickHeart}
            aria-label="favorite"
            sx={{
              zIndex: 9,
              top: 8,
              right: 8,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            <Iconify icon="mdi:cards-heart" width={24} height={24} />
          </StyledDefaultIconButton>
        )}
        <Link component={RouterLink} to={pathToProductDetails}>
          <Cover
            src={image}
            alt={name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              borderTopLeftRadius: (theme) => theme.shape.borderRadius,
              borderTopRightRadius: (theme) => theme.shape.borderRadius,
              top: 0,
            }}
          />
        </Link>
      </Box>
      <Stack spacing={0.5} sx={{ px: 2, py: 2 }}>
        <Link
          color="inherit"
          underline="hover"
          component={RouterLink}
          to={pathToProductDetails}
        >
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Stack spacing={0} direction='row' sx={{ mb: 1, flexWrap: 'wrap' }}>
          {Object.keys(attributes).slice(0, 3).map(key => (
            <Box sx={{ mr: 1, mb: 0.5 }}>
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
            </Box>
          ))}
        </Stack>
        <Stack spacing={0.5} direction='row' sx={{ alignItems: 'center' }} >
          <Rating readOnly value={averageRating} size="small" precision={0.5} />
          {numRatings > 0 && (
            <Typography variant="body1" color="text.secondary">
              ({numRatings})
            </Typography>
          )}
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" component="p" color="error">
              {fCurrency(finalPrice)}
              &nbsp;
              {hasDiscount && (
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: "text.disabled",
                    textDecoration: "line-through",
                  }}
                >
                  {fCurrency(price)}
                </Typography>
              )}
            </Typography>
          </Stack>
          {discount && (
            <Label variant='filled' color='error'>
              {discount.usePercentage
                ? `-${discount.discountPercentage * 100}%`
                : `-${fCurrency(discount.discountAmount)}`}
            </Label>
          )}
        </Box>
      </Stack>
      <Box
        sx={{
          width: "100%",
          px: 2,
          pb: 2,
          position: "absolute",
          top: "98%",
          left: 0,
          opacity: 0,
          visibility: "hidden",
          zIndex: 10,
          backgroundColor: (theme) => theme.palette.background.paper,
          boxShadow: (theme) => theme.shadows[1],
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
        className="card-action"
      >
        <Grid container spacing={1}>
          <Grid item xs={7}>
            <LoadingButton
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleClickAddToCart}
              loading={!isBuyNowClicked && addToCartStatus === ACTION_STATUS.LOADING}
            >
              {/* <Iconify icon='mdi:add-shopping-cart' width={24} height={24} />
              &nbsp; */}
              Add To Cart
            </LoadingButton>
          </Grid>
          <Grid item xs={5}>
            <LoadingButton
              variant="contained"
              color="warning"
              fullWidth
              onClick={handleClickBuyNow}
              loading={isBuyNowClicked && addToCartStatus === ACTION_STATUS.LOADING}
            >
              Buy Now
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductCard;
