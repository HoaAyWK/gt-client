import React, { Fragment, useMemo, useEffect, useState } from 'react';
import { Box, Breadcrumbs, Grid, Link, Stack, Typography, Button, Rating } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import { SyncSlider } from '../components';
import { StyledPaper } from '../components/styles';
import { Iconify, QuantityControl, ShowMoreParagraph } from '../../../components';
import { Divider as DashedDivider } from './components';
import { fCurrency } from '../../../utils/formatNumber';
import { addToCart } from '../../common/cartSlice';
import ReviewSection from './ReviewSection';
import AttributeList from './AttributeList';
import SimilarProducts from './SimilarProducts';
import PATHS from '../../../constants/paths';
import { getCategoryBySlug } from '../../common/categorySlice';

const ProductDetails = (props) => {
  const { product, variant, combinableAttributes, canReview } = props;
  const navigate = useNavigate();

  const [selectedAttributeValue, setSelectedAttributeValue] = useState(() => {
    if (!product?.hasVariant ||
      combinableAttributes?.length === 0 ||
      !variant) {
      return null;
    }

    const value = combinableAttributes[0]?.attributeValues.find(value =>
      value.id === variant.attributeSelection[combinableAttributes[0].id]);

    return { ...value, attributeId: combinableAttributes[0]?.id };
  });

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const { category } = useSelector(state => state.categories);

  const objectID = useMemo(() => {
    if (variant) {
      return variant.id;
    }

    return product?.id;
  }, [product, variant]);

  const selectedAttributes = useMemo(() => {
    if (variant) {
      return variant.attributeSelection;
    }

    return {};
  }, [variant]);

  const price = useMemo(() => {
    if (variant) {
      return variant.price;
    }

    return product?.price ?? 0;
  }, [variant]);

  const finalPrice = useMemo(() => {
    if (product && product.discount) {
      if (product.discount.usePercentage) {
        return price - (price * product.discount.percentage);
      }

      return price - product.discount.amount;
    }

    return price;
  }, [product, variant]);

  const hasDiscount = useMemo(() => {
    return product?.discount !== null;
  }, [product]);

  const images = useMemo(() => {
    if (variant) {
      return product.images.filter(image =>
        variant.assignedProductImageIds.includes(image.id));
    }

    return product?.images ?? [];
  }, [variant]);

  const stockQuantity = useMemo(() => {
    if (variant) {
      return variant.stockQuantity;
    }

    return product?.stockQuantity ?? 0;
  }, [variant]);

  const specifications = useMemo(() => {
    return product?.attributes.filter(attribute =>
      !attribute.canCombine && attribute.attributeValues.length !== 0);
  }, [product]);

  const averageRating = useMemo(() => {
    if (variant) {
      return variant.averageRating?.value ?? 0;
    }
    return product?.averageRating?.value ?? 0;
  }, [variant]);

  const numRatings = useMemo(() => {
    if (variant) {
      return variant.averageRating?.numRatings ?? 0;
    }
    return product?.averageRating?.numRatings ?? 0;
  }, [variant]);

  const breadcrumbs = useMemo(() => {
    const home = { label: 'Home', path: '/' };
    if (product && category) {
      const pathKeys = Object.keys(category.paths);

      const paths = pathKeys.map((key) => {
        return {
          label: key,
          path: `/category/${category.paths[key]}`};
      });

      return [home, ...paths, { label: product.name, path: null }]
    }
    return [home];
  }, [category, product]);

  console.log('breadcrumbs', breadcrumbs);

  useEffect(() => {
    if (product?.category) {
      dispatch(getCategoryBySlug(product.category.slug));
    }
  }, [product]);

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => prev - 1);
  };

  const handleSelectAttributeValue = (attributeValue, attributeId) => {
    const selectedAttributes = { ...variant.attributeSelection, [attributeId]: attributeValue.id };
    const attributeIds = Object.keys(selectedAttributes);
    const newVariant = product.variants.find(variant =>
      attributeIds.every(id =>
        variant.attributeSelection[id] === selectedAttributes[id]));

    setSelectedAttributeValue(prev => ({ ...attributeValue, attributeId }));
    navigate(`${PATHS.PRODUCTS}/${product.id}/variants/${newVariant.id}`);
  };

  const handleClickAddToCart = async () => {
    try {
      const actionResult = await dispatch(addToCart({
        productId: product.id,
        productVariantId: variant?.id,
        quantity: quantity }));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar(`Added ${quantity} item to your cart`, { variant: 'success' });
        setQuantity(1);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleClickBuyNow = async () => {
    try {
      const actionResult = await dispatch(addToCart({
        productId: product?.id,
        productVariantId: variant?.id,
        quantity: quantity }));

      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar(`Added ${quantity} item to your cart`, { variant: 'success' });
        setQuantity(1);
        navigate('/checkout');
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <>
      <Box sx={{ mt: 12 }}>
        <Breadcrumbs aria-label="breadcrumb-product-details">
          {breadcrumbs.map((bc) => (
            bc?.path ? (
              <Link underline='hover' key={bc.label} color='inherit' component={RouterLink} to={bc.path}>
                <Stack spacing={0.5} direction='row'>
                {bc.label === 'Home' && <Iconify icon='mdi:home' width={24} height={24} />}
                <Typography variant='body1' color='text.secondary'>{bc.label}</Typography>
                </Stack>
              </Link>
            ) : (
              <Typography variant='body1' color='text.primary' key={bc.label}>{bc.label}</Typography>
            )
          ))}
        </Breadcrumbs>
      </Box>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <SyncSlider images={images} />
        </Grid>
        <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant='h5' component='h1'>
                {product?.name}
              </Typography>

                <Stack spacing={1} direction='row'>
                  <Rating readOnly value={averageRating} precision={0.5} />
                  <Typography variant='body1' color='text.secondary'>
                    {`(${numRatings} ${numRatings > 1 ? 'reviews' : 'review'})`}
                  </Typography>
                </Stack>
              <Stack spacing={1} direction='row' alignItems='center'>
                <Typography variant='h3' component='span' color='error'>
                  {fCurrency(finalPrice)}
                </Typography>
                {hasDiscount &&
                  (<Typography variant='h4' component='span' color='text.secondary'>
                    <s>{fCurrency(price)}</s>
                  </Typography>)}
              </Stack>
            </Stack>
            <DashedDivider />
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {combinableAttributes.map((attribute) => (
                <Grid item xs={12} key={attribute.id}>
                  <Typography variant='subtitle1'>
                    {attribute.name}
                  </Typography>
                  <AttributeList
                    attribute={attribute}
                    selectedAttributeValue={selectedAttributeValue}
                    selectedAttributes={selectedAttributes}
                    onSelectAttributeValue={handleSelectAttributeValue}
                  />
                </Grid>
              ))}
            </Grid>
            <DashedDivider />
            <Stack spacing={3} sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant='body1'>
                  Quantity
                </Typography>
                <QuantityControl
                  quantity={quantity}
                  increaseQuantity={handleIncreaseQuantity}
                  decreaseQuantity={handleDecreaseQuantity}
                  max={stockQuantity}
                />
              </Box>
            </Stack>
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={6}>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  size='large'
                  onClick={handleClickAddToCart}
                >
                  <Iconify icon='material-symbols:add-shopping-cart-outline-rounded' width={24} height={24} />
                  Add To Cart
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant='contained'
                  color='warning'
                  fullWidth
                  size='large'
                  onClick={handleClickBuyNow}
                >
                  Buy Now
                </Button>
              </Grid>
            </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={7}>
          <StyledPaper sx={{ px: 2, pt: 2 }}>
            <Typography variant='h6' component='h1' color='text.primary' sx={{ mb: 2 }}>
              Description
            </Typography>
            <ShowMoreParagraph
              isDanger={true} content={product?.description}
              height={product?.description?.length > 200 ? '190px': 'auto'}
              canShowMore={product?.description?.length > 200 ? true: false}
            />
            <Box sx={{ pb: 6 }} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={5}>
          <StyledPaper sx={{ p: 2 }}>
            <Typography variant='h6' component='h1' color='text.primary' sx={{ mb: 2 }}>
              Technical Specifications
            </Typography>
            <Stack spacing={2}>
              {specifications?.map((spec, index) => (
                <Fragment key={spec.id}>
                  {index > 0 && <DashedDivider />}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant='subtitle1' color='text.primary' sx={{ mr: 2 }}>
                      {spec.name}
                    </Typography>
                    <Typography variant='body1' color='text.primary'>
                      {spec.attributeValues[0].name}
                    </Typography>
                  </Box>
                </Fragment>
              ))}
            </Stack>
          </StyledPaper>
        </Grid>
      </Grid>
      {/* <RelatedProducts currentObjectID={id} /> */}
      <ReviewSection
        product={product}
        variant={variant}
        canReview={canReview}
      />
      <SimilarProducts currentObjectID={objectID} />
      {/* <CommentSection productId={id} /> */}
    </>
  );
};

export default ProductDetails;
