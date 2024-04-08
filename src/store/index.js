import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../features/auth/authSlice';
import accountReducer from '../features/settings/accountSlice';
import productDetailsReducer from '../features/common/productDetailsSlice';
import productReviewsReducer from '../features/common/product-reviews/productReviewSlice';
import cartReducer from '../features/common/cartSlice';
import checkoutReducer from '../features/checkout/checkoutSlice';
import orderReducer from '../features/common/orderSlice';
import shippingReducer from '../features/checkout/shippingAddressSlice';
import commentReducer from '../features/products/product-details/comments/commentSlice';
import favoriteReducer from '../features/common/productFavoriteSlice';
import productReducer from '../features/products/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    productDetails: productDetailsReducer,
    productReviews: productReviewsReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    shippingAddresses: shippingReducer,
    comments: commentReducer,
    favorites: favoriteReducer,
    products: productReducer
  }
});
