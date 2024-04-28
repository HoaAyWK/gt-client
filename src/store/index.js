import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../features/auth/authSlice';
import accountReducer from '../features/settings/accountSlice';
import productDetailsReducer from '../features/common/productDetailsSlice';
import productReviewsReducer from '../features/common/product-reviews/productReviewSlice';
import cartReducer from '../features/common/cartSlice';
import checkoutReducer from '../features/checkout/checkoutSlice';
import shippingReducer from '../features/checkout/shippingAddressSlice';
import commentReducer from '../features/products/product-details/comments/commentSlice';
import favoriteReducer from '../features/common/productFavoriteSlice';
import productReducer from '../features/products/productSlice';
import searchReducer from '../features/search/searchSlice';
import categoryReducer from '../features/common/categorySlice';
import countryReducer from '../features/common/countrySlice';
import stateReducer from '../features/common/stateSlice';
import orderStatusReducer from '../features/orders/orderStatusSlice';
import orderReducer from '../features/orders/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    productDetails: productDetailsReducer,
    productReviews: productReviewsReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orderStatuses: orderStatusReducer,
    shippingAddresses: shippingReducer,
    comments: commentReducer,
    favorites: favoriteReducer,
    products: productReducer,
    search: searchReducer,
    categories: categoryReducer,
    countries: countryReducer,
    states: stateReducer,
    orders: orderReducer
  }
});
