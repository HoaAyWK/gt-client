import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Navigate } from 'react-router-dom';

import { Loading, Page } from '../components';
import { ProductDetails } from '../features/products';
import { getProduct } from '../features/products/productSlice';
import ACTION_STATUS from '../constants/actionStatus';
import { getOrdersByProductIdAndProductVariantId } from '../features/orders/orderSlice';
import { STATUS } from '../constants/orderStatus';

const ProductPage = () => {
  const { id, variantId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getProductStatus, product } = useSelector(state => state.products);
  const { ordersByProductIdAndProductVariantId: orderedOrders } = useSelector(state => state.orders);

  useEffect(() => {
    if (!id) {
      navigate('/');
    }

    dispatch(getProduct(id));
  }, [id]);

  useEffect(() => {
    if (product) {
      dispatch(getOrdersByProductIdAndProductVariantId({ productId: id, productVariantId: variantId }));
    }
  }, [id, product, variantId]);

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

  const canReview = useMemo(() => {
    if (orderedOrders.length === 0)
      return false;

    return orderedOrders.some(order =>
        order.orderStatus !== STATUS.PENDING &&
        order.orderStatus !== STATUS.CANCELED);
  }, [orderedOrders]);

  const combinableAttributes = useMemo(() => {
    if (product) {
      return product.attributes.filter(attribute => attribute.canCombine);
    }
    return [];
  }, [product]);

  if (getProductStatus === ACTION_STATUS.IDLE ||
    getProductStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
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
        canReview={canReview}
      />
    </Page>
  );
};

export default ProductPage;
