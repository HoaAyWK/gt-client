import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Navigate } from 'react-router-dom';

import { Page } from '../components';
import { ProductDetails } from '../features/products';
import { getProduct } from '../features/products/productSlice';
import ACTION_STATUS from '../constants/actionStatus';
import { LoadingPage } from '../components';

const ProductPage = () => {
  const { id, variantId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getProductStatus, product } = useSelector(state => state.products);

  useEffect(() => {
    if (!id) {
      navigate('/');
    }

    dispatch(getProduct(id));
  }, [id]);

  const variant = useMemo(() => {
    if (product) {
      if (!product.hasVariant) {
        return null;
      }

      if (!variantId && product.variants.length > 0) {
        return product.variants[0];
      }
      return product.variants.find(variant => variant.id === variantId);
    }

    return null;
  }, [variantId, product]);

  const combinableAttributes = useMemo(() => {
    if (product) {
      return product.attributes.filter(attribute => attribute.canCombine);
    }
    return [];
  }, [product]);

  if (getProductStatus === ACTION_STATUS.IDLE ||
    getProductStatus === ACTION_STATUS.LOADING) {
    return <LoadingPage />;
  }

  if (getProductStatus === ACTION_STATUS.FAILED) {
    return <Navigate to='/' />;
  }

  return (
    <Page title='Product details' sx={{ mt: 4 }}>
      <ProductDetails
        product={product}
        variant={variant}
        combinableAttributes={combinableAttributes}
      />
    </Page>
  );
};

export default ProductPage;
