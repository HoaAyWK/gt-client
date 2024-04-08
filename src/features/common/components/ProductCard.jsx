import React, { useMemo } from "react";
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
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";

import { Cover, Iconify, Label } from "../../../components";
import { fCurrency } from "../../../utils/formatNumber";
import { addToCart } from "../cartSlice";
import { createFavorite, deleteFavorite } from "../productFavoriteSlice";
import { useLocalStorage } from "../../../hooks";
import path from "path";

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
    finalPrice,
    hasVariant
  } = product;

  const dispatch = useDispatch();
  const [localCart] = useLocalStorage("cart", null);
  const { user } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const hit = { ...product };

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

  const priceReal = useMemo(() => {
    if (discount > 0) {
      return price - price * (discount / 100);
    }

    return price;
  }, [price, discount]);

  const handleClickAddToCart = async () => {
    sendEvent("conversion", hit, "Add to cart");
    try {
      const actionResult = await dispatch(
        addToCart({ productId: productId, quantity: 1, userId: localCart })
      );
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar("Added 1 item to your cart", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const handleClickBuyNow = async () => {
    sendEvent("conversion", hit, "Add to cart and view cart");
    try {
      const actionResult = await dispatch(
        addToCart({ productId: productId, quantity: 1, userId: localCart })
      );
      const result = unwrapResult(actionResult);

      if (result) {
        navigate("/checkout");
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
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
        <Rating readOnly value={averageRating} size="small" precision={0.5} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" component="p" color="error">
              {/* {fCurrency(priceReal)} */}
              {fCurrency(price)}
              &nbsp;
              {discount > 0 && (
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: "text.disabled",
                    textDecoration: "line-through",
                  }}
                >
                  {/* {discount && fCurrency(price)} */}
                  {fCurrency(finalPrice)}
                </Typography>
              )}
            </Typography>
          </Stack>
          {discount > 0 && (
            // <Label variant='outlined' color='error'>-{discount}%</Label>
            <Label variant="outlined" color="error">
              -50%
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
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleClickAddToCart}
            >
              {/* <Iconify icon='mdi:add-shopping-cart' width={24} height={24} />
              &nbsp; */}
              Add To Cart
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              onClick={handleClickBuyNow}
            >
              Buy Now
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductCard;
