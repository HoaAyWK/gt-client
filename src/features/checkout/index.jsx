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
import { clearCheckoutClick, getCart } from '../common/cartSlice';
import { useLocalStorage } from '../../hooks';
import { PAYMENT_OPTIONS } from '../../constants/payment';
import { checkoutWithCash, checkoutWithStripe } from './checkoutSlice';
import { STATUS } from '../../constants/orderStatus';
import { selectAllShippingAddresses, getShippingAddresses } from './shippingAddressSlice';

const steps = [
  'Cart',
  'Shipping address',
  'Payment'
];

const Checkout = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useLocalStorage('checkoutStep', 0);
  const [address, setAddress] = useLocalStorage('shippingAddress', 0);
  const { user } = useSelector((state) => state.auth);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [localCart, setLocalCart] = useLocalStorage("cart", null);

  const [paymentOption, setPaymentOption] = useState(PAYMENT_OPTIONS.CASH);
  const navigate = useNavigate();
  const { getCartStatus, cart, checkoutClicked } = useSelector((state) => state.cart);
  const { checkoutStripeStatus } = useSelector((state) => state.checkout);
  const shippingAddresses = useSelector(selectAllShippingAddresses);
  const { getShippingAddressesStatus, entities: addressEntities } = useSelector((state) => state.shippingAddresses);

  const numSelected = useMemo(() => {
    if (!cart || !cart?.cartItems) {
      return 0;
    }

    if (cart.cartItems) {
      const initialValue = 0;
      return cart.cartItems.reduce((sum, item) => item.status ? sum + 1 : sum, initialValue);
    }
  }, [cart]);

  const subTotal = useMemo(() => {
    if (!cart || !cart?.cartItems || cart?.cartItems?.length === 0) {
      return 0;
    }

    if (cart.cartItems) {
      const initialValue = 0;
      return cart.cartItems.reduce(
        (sum, item) => item.status ?
          sum + item.quantity * (item.price - item.price * (item.discount / 100)) : sum + 0, initialValue);
    }
  }, [cart]);


  useEffect(() => {
    if (getCartStatus === ACTION_STATUS.IDLE) {
      dispatch(getCart(localCart));
    }

    if (checkoutClicked) {
      dispatch(clearCheckoutClick());
    }

    if (getShippingAddressesStatus === ACTION_STATUS.IDLE) {
      dispatch(getShippingAddresses());
    }

  }, []);

  useEffect(() => {
    if (address === 0 && user) {
      setSelectedAddress({
        id: 0,
        acceptorName: user.firstName + " " + user.lastName,
        acceptorPhone: user.phone,
        deliveryAddress: user.address
      });
    } else if (Object.keys(addressEntities).length > 0) {
      setSelectedAddress(addressEntities[address]);
    }
  }, [address, user, addressEntities]);

  useEffect(() => {
    if (getCartStatus === ACTION_STATUS.SUCCEEDED && cart.userId !== localCart) {
      setLocalCart(cart.userId);
    }
  }, [getCartStatus, cart]);

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
      try {
        const actionResult = await dispatch(checkoutWithCash({
          paymentType: paymentOption,
          status: STATUS.PROCESSING,
          shippingAddress: address
        }));
        const result = unwrapResult(actionResult);

        if (result) {
          enqueueSnackbar('Checkout successfully!', { variant: 'success' });
          dispatch(getCart(localCart));
          setActiveStep(0);
          navigate('/checkout-success');
        }
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    } else if (paymentOption === PAYMENT_OPTIONS.CREDIT) {
      try {
        const actionResult = await dispatch(checkoutWithStripe({
          paymentType: paymentOption,
          status: STATUS.PROCESSING,
          shippingAddress: address
        }));
        const result = unwrapResult(actionResult);

        if (result) {
          if (result.url) {
            window.location.href = result.url;
          }
        }
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  };

  if (getCartStatus === ACTION_STATUS.IDLE ||
    getCartStatus === ACTION_STATUS.LOADING ||
    getShippingAddressesStatus === ACTION_STATUS.IDLE ||
    getShippingAddressesStatus === ACTION_STATUS.LOADING ||
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
      <Grid container spacing={2} sx={{ mt: 4 }}>
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
          <Cart step={activeStep} cart={cart} numSelected={numSelected} />
          <BillingAndAddress
            user={user}
            addresses={shippingAddresses}
            status={getShippingAddressesStatus}
            step={activeStep}
            onNext={handleNext}
            onBack={handleBack}
            numSelected={numSelected}
            onBackActiveStep={onBackActiveStep}
            onSelectAddress={handleSelectAddress}
          />
          <PaymentOptions
            user={user}
            onBackActiveStep={onBackActiveStep}
            step={activeStep}
            onBack={handleBack}
            numSelected={numSelected}
            paymentOption={paymentOption}
            onSelectPaymentOption={handleSelectPaymentOption}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {activeStep === 2 && (
              <BillingAddress
                showTitle={true}
                item={selectedAddress}
                onClickEdit={handleBack}
              />
            )}
            {numSelected > 0 && (
              <OrderSummary
                user={user}
                cart={cart}
                step={activeStep}
                onNext={handleNext}
                onClickEdit={() => setActiveStep(0)}
                numSelected={numSelected}
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
