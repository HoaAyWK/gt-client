import React, { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useRoutes, Outlet } from "react-router-dom";

import { useLocalStorage } from "./hooks";
import { LoadingPage } from "./components";
import ACTION_STATUS from "./constants/actionStatus";
import { getCurrentUserInfo } from "./features/auth/authSlice";

import { MainLayout, SettingsLayout } from "./layouts";

import { Login, Register, VerifyEmail, ForgetPassword, ResetPassword } from "./features/auth";

import {
  HomePage,
  CheckoutPage,
  ProductPage,
  SearchPage,
  LaptopsPage,
  SmartphonesPage,
  CheckoutSuccessPage,
  CategoryPage
} from "./pages";
import BrandPage from "./pages/BrandPage";

const AddressSettingsPage = lazy(() => import("./pages/AddressSettingsPage"));
const AccountSettingsPage = lazy(() =>
  import("./pages/AccountSettingsPage")
);
const PasswordSettingsPage = lazy(() =>
  import("./pages/PasswordSettingsPage")
);
const MyOrdersPage = lazy(() => import("./pages/MyOrdersPage"));

const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const OrderDetailsPage = lazy(() => import("./pages/OrderDetailsPage"));

const RejectedRoute = () => {
  const dispatch = useDispatch();
  const [accessToken] = useLocalStorage("accessToken", null);
  const { getCurrentUserStatus, statusCode } = useSelector((state) => state.auth);
  const { checkoutClicked } = useSelector((state) => state.cart);

  useEffect(() => {
    if (accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
      dispatch(getCurrentUserInfo());
    }
  }, []);

  if (statusCode === 401) {
    localStorage.setItem("accessToken", null);
    return (<Outlet />);
  }

  if (getCurrentUserStatus === ACTION_STATUS.LOADING) {
    return <LoadingPage />;
  }

  if (getCurrentUserStatus === ACTION_STATUS.SUCCEEDED) {
    if (checkoutClicked) {
      return <Navigate to="/checkout" />;
    }
  }

  return <Outlet />;
};

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const [accessToken] = useLocalStorage("accessToken", null);
  const { getCurrentUserStatus, isAuthenticated, statusCode } = useSelector(
    (state) => state.auth
  );

  if (statusCode === 401) {
    localStorage.setItem("accessToken", null);
    return <Navigate to="/" />;
  }

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
    return <Navigate to="/" />;
  }

  if (accessToken && isAuthenticated) {
    return <Outlet />;
  }

  return <Outlet />;
  // return <Navigate to="/" />;
};

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "search", element: <SearchPage /> },
        { path: "products/:id", element: <ProductPage /> },
        { path: "products/:id/variants/:variantId", element: <ProductPage /> },
        { path: "checkout", element: <CheckoutPage /> },
        { path: "laptops", element: <LaptopsPage /> },
        { path: "smartphones", element: <SmartphonesPage /> },
        {
          path: "category/:category",
          element: <CategoryPage />
        },
        {
          path: "brand/:brand",
          element: <BrandPage />
        },
        {
          path: "",
          element: <ProtectedRoute />,
          children: [
            { path: "profile", element: <ProfilePage /> },
            { path: "checkout-success", element: <CheckoutSuccessPage /> },
            {
              path: "user",
              element: <SettingsLayout />,
              children: [
                { path: "", element: <Navigate to="/user/account/profile" /> },
                { path: "account", element: <Navigate to="/user/account/profile" /> },
                { path: "account/profile", element: <AccountSettingsPage /> },
                { path: "account/addresses", element: <AddressSettingsPage /> },
                { path: "account/password", element: <PasswordSettingsPage /> },
                { path: "orders", element: <MyOrdersPage />},
                { path: "orders/:id", element: <OrderDetailsPage />}
              ],
            },
          ],
        },
      ],
    },
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "sign-up",
          element: <Register />,
        },
        {
          path: "verify-email",
          element: <VerifyEmail />,
        },
        {
          path: "forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        }
      ],
    },
  ]);
};

export default Router;
