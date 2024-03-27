import React, { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useRoutes, Outlet } from 'react-router-dom';

import { useLocalStorage } from './hooks';
import { LoadingPage } from './components';
import ACTION_STATUS from './constants/actionStatus';
import { getCurrentUserInfo } from './features/auth/authSlice';

import { MainLayout, SettingsLayout } from './layouts';

import { Login, Register } from './features/auth';

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

const RejectedRoute = () => {
  const dispatch = useDispatch();
  const [accessToken] = useLocalStorage('accessToken', null);
  const { getCurrentUserStatus } = useSelector((state) => state.auth);
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
  }

  return <Outlet />
};

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const [accessToken] = useLocalStorage('accessToken', null);
  const { getCurrentUserStatus, isAuthenticated } = useSelector((state) => state.auth);

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

  if (accessToken && isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to='/' />;
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
