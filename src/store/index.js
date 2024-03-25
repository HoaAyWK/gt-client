import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../features/auth/authSlice';
import adminBrandReducer from '../features/admin/brand/brandSlice';
import adminCategoryReducer from '../features/admin/category/categorySlice';
import adminInventoryReducer from '../features/admin/inventory/inventorySlice';
import adminUserReducer from '../features/admin/users/userSlice';
import adminOrderReducer from '../features/admin/order/orderSlice';
import accountReducer from '../features/settings/accountSlice';
import adminProductOriginReducer from '../features/admin/product-origin/productOriginSlice';
import adminBannerReducer from '../features/admin/banner/bannerSlice';
import bannerReducer from '../features/home/banners/bannerSlice';
import adminProductVariantReducer from '../features/admin/product-variant/productVariantSlice';
import productDetailsReducer from '../features/common/productDetailsSlice';
import productReviewsReducer from '../features/common/product-reviews/productReviewSlice';
import cartReducer from '../features/common/cartSlice';
import checkoutReducer from '../features/checkout/checkoutSlice';
import orderReducer from '../features/common/orderSlice';
import shippingReducer from '../features/checkout/shippingAddressSlice';
import commentReducer from '../features/products/product-details/comments/commentSlice';
import favoriteReducer from '../features/common/productFavoriteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    adminBrands: adminBrandReducer,
    adminCategories: adminCategoryReducer,
    adminInventories: adminInventoryReducer,
    adminUsers: adminUserReducer,
    adminOrders: adminOrderReducer,
    adminProductOrigins: adminProductOriginReducer,
    adminProductVariants: adminProductVariantReducer,
    adminBanners: adminBannerReducer,
    banners: bannerReducer,
    productDetails: productDetailsReducer,
    productReviews: productReviewsReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    shippingAddresses: shippingReducer,
    comments: commentReducer,
    favorites: favoriteReducer,
  }
});
