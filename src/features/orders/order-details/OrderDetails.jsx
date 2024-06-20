import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  IconButton,
  Grid,
  Stack,
  Typography,
  styled,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

import { Iconify, Label, DashedLine, Loading } from '../../../components';
import { OrderItemLine, OrderTimelines } from './components';
import { fDateTime } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
import creditCard from '../../../assets/icons/payments/ic_visa.svg';
import { confirmOrderReceived, getOrder } from '../orderSlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import { STATUS, ORDER_STATUS_HISTORY } from '../../../constants/orderStatus';
import ConfirmDialogV2 from '../../common/ConfirmDialogV2';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.content,
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
}));

const OrderDetails = ({ id }) => {
  const {
    order,
    getOrderStatus,
    confirmOrderReceivedStatus
  } = useSelector(state => state.orders);

  const { hubConnection } = useSelector((state) => state.notifications);
  const [openConfirmReceivedDialog, setOpenConfirmReceivedDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalDiscount = useMemo(() => {
    if (!order) {
      return 0;
    }

    return order.orderItems.reduce((acc, item) => acc + item.totalDiscount, 0);
  }, [order]);

  const statusColor = useMemo(() => {
    if (!order) {
      return 'inherit';
    }

    switch (order.orderStatus) {
      case STATUS.PENDING:
        return 'warning';
      case STATUS.PROCESSING:
        return 'warning';
      case STATUS.COMPLETED:
        return 'success';
      default:
        return 'error';
    }
  }, [order]);

  const canCompleteOrder = useMemo(() => {
    if (!order) {
      return false;
    }

    const latestStatusTracking = order.orderStatusHistoryTrackings[0];

    return latestStatusTracking.status === ORDER_STATUS_HISTORY.ORDER_RECEIVED;
  }, [order]);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenConfirmReceivedDialog = () => {
    setOpenConfirmReceivedDialog(true);
  };

  const handleCloseConfirmReceivedDialog = () => {
    setOpenConfirmReceivedDialog(false);
  };

  const handleConfirmReceived = async () => {
    const actionResult = await dispatch(confirmOrderReceived(order.id));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar('Confirmed successfully', { variant: 'success' });

      if (hubConnection) {
        try {
          await hubConnection.invoke('NotifyAdminWhenOrderCompletedByCustomer', order.id);
        } catch (error) {
          console.error(error);
        }
      };

      handleCloseConfirmReceivedDialog();
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
  };

  if ( getOrderStatus === ACTION_STATUS.IDLE ||
    getOrderStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getOrderStatus === ACTION_STATUS.FAILED || !order) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 4 }}>
        Order not found.
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          flexWrap: 'wrap'
        }}
      >
        <Stack spacing={0.5}>
          <Stack spacing={1} direction='row' sx={{ alignItems: 'center' }}>
            <IconButton onClick={handleBack}>
              <Iconify icon='eva:arrow-ios-back-outline' width={24} height={24} />
            </IconButton>
            <Typography variant='h6' component='h1'>Order #{order.orderNumber}</Typography>
            <Label color={statusColor}>{order.orderStatus}</Label>
          </Stack>
          <Box>
            <Typography variant='body1' color='text.secondary' sx={{ ml: 6 }}>
              Order date: {fDateTime(order.createdDateTime)}
            </Typography>
          </Box>
        </Stack>
        <Stack direction='row' spacing={0.5}>
          {canCompleteOrder && (
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={handleOpenConfirmReceivedDialog}
            >
              Confirm Received
            </Button>
          )}
        </Stack>
      </Box>
      <Box>
        <Grid container spacing={0}>
          <Grid xs={12} md={7.95}>
            <StyledBox>
              <Box sx={{ px: 2, pt: 2 }}>
                <Typography variant='subtitle1'>Details</Typography>
                {order.orderItems.map(item => (
                  <OrderItemLine key={item.id} item={item} />
                ))}
              </Box>
              <DashedLine />
              <Box sx={{ p: 2 }}>
                <Grid container spacing={1}>
                  <Grid item xs={9}>
                    <Typography variant='body2' color='text.secondary' textAlign='end'>SubTotal</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='body1' textAlign='end'>{fCurrency(order.totalAmount)}</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant='body2' color='text.secondary' textAlign='end'>Discount</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='body1' color='error' textAlign='end'>{fCurrency(totalDiscount)}</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant='subtitle1' textAlign='end'>Total</Typography>
                  </Grid>
                  <Grid item xs={3}>
                  <Typography variant='subtitle1' textAlign='end'>{fCurrency(order.totalAmount + totalDiscount)}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </StyledBox>
            <Box sx={{ my: 1 }} />
            <StyledBox>
              <Box sx={{ px: 2, pt: 2 }}>
                <Typography variant='subtitle1'>History</Typography>
                <OrderTimelines orderStatusHistoryTrackings={order.orderStatusHistoryTrackings} />
              </Box>
            </StyledBox>
          </Grid>
          <Grid xs={12} md={0.1}>
            <Box sx={{ height: 8 }} />
          </Grid>
          <Grid xs={12} md={3.95}>
            <StyledBox>
              <Box sx={{ p: 2 }}>
                <Typography variant='subtitle1' sx={{ mb: 1 }}>Shipping Address</Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant='body2' color='text.secondary'>
                      Receiver
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      {order.shippingAddress.receiverName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2' color='text.secondary'>Phone</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      {order.shippingAddress.phoneNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2' color='text.secondary'>Address</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <DashedLine />
              <Box sx={{ p: 2 }}>
                <Typography variant='subtitle1' sx={{ mb: 1 }}>Payment</Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant='body2' color='text.secondary'>Payment Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2' color='text.primary'>
                      {order.paymentStatus}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                      <Typography variant='body2' color='text.secondary'>Payment Method</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1} direction='row' sx={{ alignItems: 'center' }}>
                      {order.paymentMethod === 'CreditCard' ? (
                        <Stack spacing={1} direction='row' sx={{ alignItems: 'center' }}>
                          <Typography variant='body2'>Credit Card</Typography>
                          <Box
                            component='img'
                            src={creditCard}
                            alt='visa'
                            sx={{
                              width: 32,
                              height: 32
                            }}
                          />
                        </Stack>
                      ) : (
                        <Stack spacing={1} direction='row' sx={{ alignItems: 'center' }}>
                          <Typography variant='body2'>Cash</Typography>
                          <Iconify
                            icon='mdi:cash'
                            style={{ color: '#00B074' }}
                            width={24}
                            height={24}
                          />
                        </Stack>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </StyledBox>
          </Grid>
        </Grid>
      </Box>
      <ConfirmDialogV2
        dialogTitle='Confirm Received'
        dialogContent='Are you sure you want to confirm that you have received the order?'
        open={openConfirmReceivedDialog}
        handleClose={handleCloseConfirmReceivedDialog}
        status={confirmOrderReceivedStatus}
        onConfirm={handleConfirmReceived}
      />
    </Box>
  );
};

export default OrderDetails;
