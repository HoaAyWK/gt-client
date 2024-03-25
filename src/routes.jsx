import React, { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useRoutes, Outlet } from 'react-router-dom';

import ROLES from './constants/userRoles';
import { useLocalStorage } from './hooks';
import { LoadingPage } from './components';
import ACTION_STATUS from './constants/actionStatus';
import { getCurrentUserInfo } from './features/auth/authSlice';

import { AdminLayout, MainLayout, SettingsLayout } from './layouts';

import { Login, Register } from './features/auth';
import { DashboardPage } from './pages/admin';

import {
  HomePage,
  CheckoutPage,
  ProductPage,
  SearchPage,
  LaptopsPage,
  SmartphonesPage,
  CheckoutSuccessPage
} from './pages';

const AdminSettings = lazy(() => import('./features/settings/AdminSettings'));
const AccountSettings = lazy(() => import('./features/settings/AccountSettings'));
const PasswordSettings = lazy(() => import('./features/settings/PasswordSettings'));

const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const OrderDetailsPage = lazy(() => import('./pages/OrderDetailsPage'));

const BannersPage = lazy(() => import('./pages/admin/banner/BannersPage'));
const UserListPage = lazy(() => import('./pages/admin/user/UserListPage'));
const OrderListPage = lazy(() => import('./pages/admin/order/OrderListPage'));
const BrandListPage = lazy(() => import('./pages/admin/brand/BrandListPage'));
const CreateUserPage = lazy(() => import('./pages/admin/user/CreateUserPage'));
const UpdateUserPage = lazy(() => import('./pages/admin/user/UpdateUserPage'));
const UserDetailsPage = lazy(() => import('./pages/admin/user/UserDetailsPage'));
const CategoryListPage = lazy(() => import('./pages/admin/category/CategoryListPage'));
const AdminOrderDetailsPage = lazy(() => import('./pages/admin/order/OrderDetailsPage'));
const InventoryListPage = lazy(() => import('./pages/admin/inventory/InventoryListPage'));

const ProductOriginListPage = lazy(() => import('./pages/admin/product-origin/ProductOriginListPage'));
const CreateProductOriginPage = lazy(() => import('./pages/admin/product-origin/CreateProductOriginPage'));
const UpdateProductOriginPage = lazy(() => import('./pages/admin/product-origin/UpdateProductOriginPage'));
const ProductOriginDetailsPage = lazy(() => import('./pages/admin/product-origin/ProductOriginDetailsPage'));

const ProductVariantListPage = lazy(() => import('./pages/admin/product-variant/ProductVariantListPage'));
const CreateProductVariantPage = lazy(() => import('./pages/admin/product-variant/CreateProductVariantPage'));
const UpdateProductVariantPage = lazy(() => import('./pages/admin/product-variant/UpdateProductVariantPage'));
const ProductVariantDetailsPage = lazy(() => import('./pages/admin/product-variant/ProductVariantDetailsPage'));


const RejectedRoute = () => {
  const dispatch = useDispatch();
  const [accessToken] = useLocalStorage('accessToken', null);
  const { getCurrentUserStatus, user } = useSelector((state) => state.auth);
  const { checkoutClicked } = useSelector((state) => state.cart);

  useEffect(() => {
    if (accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
      dispatch(getCurrentUserInfo());
    }
  }, []);

  if (getCurrentUserStatus === ACTION_STATUS.LOADING) {
    return <LoadingPage />;
  }

  if (getCurrentUserStatus === ACTION_STATUS.SUCCEEDED) {
    if (checkoutClicked) {
      return <Navigate to='/checkout' />;
    }

    if (user?.role === ROLES.ADMIN) {
      return <Navigate to='/admin/dashboard' />;
    } else {
      return <Navigate to='/' />;
    }
  }

  return <Outlet />
};

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const [accessToken] = useLocalStorage('accessToken', null);
  const { getCurrentUserStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
      dispatch(getCurrentUserInfo());
    }
  }, []);

  if (getCurrentUserStatus === ACTION_STATUS.LOADING) {
    return <LoadingPage />;
  }

  if (getCurrentUserStatus === ACTION_STATUS.SUCCEEDED) {
    return <Outlet />;
  }

  if (getCurrentUserStatus === ACTION_STATUS.FAILED) {
    return <Navigate to='/' />;
  }

  if (accessToken) {
    return <Outlet />;
  }

  return <Navigate to='/' />;
};

const ProtectedAdminRoute = () => {
  const dispatch = useDispatch();
  const [accessToken] = useLocalStorage('accessToken', null);
  const { getCurrentUserStatus, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
      dispatch(getCurrentUserInfo());
    }
  }, []);

  if (!accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
    return <Navigate to='/' />;
  }

  if (accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
    return <Outlet />;
  }

  if (getCurrentUserStatus === ACTION_STATUS.LOADING) {
    return <LoadingPage />;
  }

  if (getCurrentUserStatus === ACTION_STATUS.FAILED) {
    return <Navigate to='/' />;
  }

  return (getCurrentUserStatus === ACTION_STATUS.SUCCEEDED && user?.role === ROLES.ADMIN) ? <Outlet /> : <Navigate to='/' />;
};

const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '', element: <HomePage /> },
        { path: 'search', element: <SearchPage /> },
        { path: 'products/:id', element: <ProductPage />},
        { path: 'checkout', element: <CheckoutPage /> },
        { path: 'laptops', element: <LaptopsPage /> },
        { path: 'smartphones', element: <SmartphonesPage /> },
        {
          path: '',
          element: <ProtectedRoute />,
          children: [
            { path: 'profile', element: <ProfilePage /> },
            { path: 'orders/:id', element: <OrderDetailsPage /> },
            { path: 'checkout-success', element: <CheckoutSuccessPage /> },
            {
              path: 'settings',
              element: <SettingsLayout />,
              children: [
                { path: '', element: <Navigate to='profile' /> },
                { path: 'profile', element: <AccountSettings /> },
                { path: 'password', element: <PasswordSettings /> },
                { path: 'admin', element: <AdminSettings /> },
              ]
            },
          ]
        }
      ]
    },
    {
      path: 'admin',
      element: <ProtectedAdminRoute />,
      children: [
        {
          path: '',
          element: <AdminLayout />,
          children: [
            { path: '', element: <Navigate to='dashboard' /> },
            { path: 'dashboard', element: <DashboardPage /> },
            {
              path: 'users',
              children: [
                {
                  path: '',
                  element: <Navigate to='list' />
                },
                {
                  path: 'list',
                  element: <UserListPage />
                },
                {
                  path: 'create',
                  element: <CreateUserPage />
                },
                {
                  path: 'edit/:id',
                  element: <UpdateUserPage />
                },
                {
                  path: 'details/:id',
                  element: <UserDetailsPage />
                }
              ]
            },
            {
              path: 'product-origins',
              children: [
                {
                  path: '',
                  element: <Navigate to='list' />,
                },
                {
                  path: 'list',
                  element: <ProductOriginListPage />
                },
                {
                  path: 'create',
                  element: <CreateProductOriginPage />,
                },
                {
                  path: 'details/:id',
                  element: <ProductOriginDetailsPage />
                },
                {
                  path: 'edit/:id',
                  element: <UpdateProductOriginPage />
                }
              ]
            },
            {
              path: 'product-variants',
              children: [
                {
                  path: '',
                  element: <Navigate to='list' />,
                },
                {
                  path: 'list',
                  element: <ProductVariantListPage />
                },
                {
                  path: 'create',
                  element: <CreateProductVariantPage />
                },
                {
                  path: 'details/:id',
                  element: <ProductVariantDetailsPage />
                },
                {
                  path: 'edit/:id',
                  element: <UpdateProductVariantPage />
                }
              ]
            },
            {
              path: 'categories',
              element: <CategoryListPage />
            },
            {
              path: 'brands',
              element: <BrandListPage />
            },
            {
              path: 'warehouse',
              element: <InventoryListPage />
            },
            {
              path: 'orders',
              children: [
                { path: '', element: <Navigate to='list' /> },
                { path: 'list', element: <OrderListPage /> },
                { path: 'details/:id', element: <AdminOrderDetailsPage /> }
              ]
            },
            {
              path: 'banners',
              element: <BannersPage />
            }
          ]
        },
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'sign-up',
          element: <Register />
        },
      ]
    },
  ]);
};

export default Router;
