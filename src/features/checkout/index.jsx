import React, { useState, useEffect, useMemo } from 'react';
import { Box, CircularProgress, Grid, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

import BillingAndAddress from './BillingAndAddress';
import Cart from './cart';
import OrderSummary from './OrderSummary';
import { BillingAddress } from './components';
import PaymentOptions from './PaymentOptions';
import ACTION_STATUS from '../../constants/actionStatus';
import { clearCheckoutClick, setEmptyCart, getCart } from '../common/cartSlice';
import { useLocalStorage } from '../../hooks';
import { PAYMENT_OPTIONS } from '../../constants/payment';
import { checkoutWithCash, checkoutWithStripe } from './checkoutSlice';
import { STATUS } from '../../constants/orderStatus';

const steps = [
  'Cart',
  'Shipping address',
  'Payment'
];

const Checkout = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useLocalStorage('checkoutStep', 0);
  const { user } = useSelector((state) => state.auth);
  const { hubConnection } = useSelector((state) => state.notifications);

  const addresses = useMemo(() => {
    if (!user || !user.addresses) {
      return [];
    }

    return user.addresses;
  }, [user]);

  const [address, setAddress] = useState(() => {
    return addresses.find((address) => address.isDefault);
  });

  const [paymentOption, setPaymentOption] = useState(PAYMENT_OPTIONS.CASH);
  const navigate = useNavigate();
  const { getCartStatus, cart } = useSelector((state) => state.cart);
  const { checkoutStripeStatus } = useSelector((state) => state.checkout);

  const subTotal = useMemo(() => {
    if (!cart || cart.items.length === 0) {
      return 0;
    }

    return cart.items.reduce((acc, item) => {
      return acc + item.subTotal;
    }, 0);
  }, [cart]);

  useEffect(() => {
    if (getCartStatus === ACTION_STATUS.IDLE) {
      dispatch(getCart());
    }

  }, []);

  useEffect(() => {
    if (cart && cart.items.length === 0) {
      setActiveStep(0);
    }

    if (addresses.length === 0 && activeStep > 0) {
      setActiveStep(0);
    }
  }, [cart, addresses]);

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const onBackActiveStep = (step) => {
    setActiveStep(step);
  };

  const handleSelectPaymentOption = (option) => {
    setPaymentOption(option);
  };

  const handleSelectAddress = (address) => {
    setAddress(address);
  };

  const handleCompleteOrder = async () => {
    if (paymentOption === PAYMENT_OPTIONS.CASH) {
        const actionResult = await dispatch(checkoutWithCash({
          addressId: address.id
        }));

        const result = unwrapResult(actionResult);

        if (result.success) {
          enqueueSnackbar('Checkout successfully!', { variant: 'success' });
          setActiveStep(0);
          dispatch(setEmptyCart());
          try {
            if (hubConnection) {
              await hubConnection.invoke('NotifyAdminWhenOrderPlaced', result.data.id);
            }
          } catch (error) {
            console.log(error);
          }

          navigate('/checkout-success');

          return;
        }

        if (result.errors) {
          const errorKeys = Object.keys(result.errors);
          errorKeys.forEach((key) => {
            result.errors[key].forEach(error => {
              enqueueSnackbar(error, { variant: "error" });
            }
          )});

          return;
        }

        enqueueSnackbar(result.error, { variant: "error" });
    } else if (paymentOption === PAYMENT_OPTIONS.CREDIT) {
        const actionResult = await dispatch(checkoutWithStripe({
          status: STATUS.PROCESSING,
          addressId: address.id
        }));

        const result = unwrapResult(actionResult);

        if (result.success) {
          if (result.data.url) {
            window.location.href = result.data.url;
            dispatch(setEmptyCart());
            setActiveStep(0);
            return;
          }
        }

        if (result.errors) {
          const errorKeys = Object.keys(result.errors);
          errorKeys.forEach((key) => {
            result.errors[key].forEach(error => {
              enqueueSnackbar(error, { variant: "error" });
            }
          )});

          return;
        }

        enqueueSnackbar(result.error, { variant: "error" });
    }
  };

  if (!cart ||
    checkoutStripeStatus === ACTION_STATUS.LOADING) {
    return (
      <Box
        sx={{
          width: '100%',
          py: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (getCartStatus === ACTION_STATUS.FAILED) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 12 }}>
        <Grid item xs={12} md={8}>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} md={8}>
          <Cart step={activeStep} cart={cart} />
          <BillingAndAddress
            user={user}
            addresses={addresses}
            step={activeStep}
            onNext={handleNext}
            onBack={handleBack}
            onBackActiveStep={onBackActiveStep}
            onSelectAddress={handleSelectAddress}
          />
          <PaymentOptions
            user={user}
            onBackActiveStep={onBackActiveStep}
            step={activeStep}
            onBack={handleBack}
            paymentOption={paymentOption}
            onSelectPaymentOption={handleSelectPaymentOption}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {activeStep === 2 && (
              <BillingAddress
                showTitle={true}
                item={address}
                onClickEdit={handleBack}
                onBackActiveStep={onBackActiveStep}
              />
            )}
            {cart.items.length > 0 && (
              <OrderSummary
                user={user}
                cart={cart}
                step={activeStep}
                onNext={handleNext}
                onClickEdit={() => setActiveStep(0)}
                subTotal={subTotal}
                onClickCompleteOrder={handleCompleteOrder}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Checkout;
