import React, { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import { Label } from '../../../components';
import { fCurrency } from '../../../utils/formatNumber';
import { fDateTime } from '../../../utils/formatTime';
import ACTION_STATUS from '../../../constants/actionStatus';
import { STATUS, ORDER_STATUS_HISTORY } from '../../../constants/orderStatus';
import OrderItem from './OrderItem';
import PATHS from '../../../constants/paths';
import ConfirmDialogV2 from '../../common/ConfirmDialogV2';
import { cancelOrder, confirmOrderReceived } from '../orderSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const Order = ({ order }) => {
  const {
    id,
    orderNumber,
    createdDateTime,
    orderStatus,
    totalAmount,
    orderItems,
    paymentMethod
  } = order;

  const dispatch = useDispatch();
  const [openConfirmCancelDialog, setOpenConfirmCancelDialog] = useState(false);
  const [openConfirmOrderReceivedDialog, setOpenConfirmOrderReceivedDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { hubConnection } = useSelector((state) => state.notifications);
  const { cancelOrderStatus, confirmOrderReceivedStatus } = useSelector((state) => state.orders);

  const statusColor = useMemo(() => {
    switch (orderStatus) {
      case STATUS.PENDING:
        return 'warning';
      case STATUS.PROCESSING:
        return 'warning';
      case STATUS.COMPLETED:
        return 'success';
      default:
        return 'error';
    }
  }, [orderStatus]);

  const totalDiscount = useMemo(() => {
    if (!order) {
      return 0;
    }

    return order.orderItems.reduce((acc, item) => acc + item.totalDiscount, 0);
  }, [order]);

  const canCompleteOrder = useMemo(() => {
    if (!order) {
      return false;
    }

    let containedOrderReceived = false;
    let containedOrderCompleted = false;

    order.orderStatusHistoryTrackings.forEach((tracking) => {
      if (tracking.status === ORDER_STATUS_HISTORY.ORDER_RECEIVED) {
        containedOrderReceived = true;
      }

      if (tracking.status === ORDER_STATUS_HISTORY.ORDER_COMPLETED) {
        containedOrderCompleted = true;
      }
    });

    return containedOrderReceived && !containedOrderCompleted;
  }, [order]);

  const handleOpenConfirmCancelDialog = () => {
    setOpenConfirmCancelDialog(true);
  };

  const handleCloseConfirmCancelDialog = () => {
    setOpenConfirmCancelDialog(false);
  };

  const handleOpenConfirmOrderReceivedDialog = () => {
    setOpenConfirmOrderReceivedDialog(true);
  };

  const handleCloseConfirmOrderReceivedDialog = () => {
    setOpenConfirmOrderReceivedDialog(false);
  };

  const handleCancelOrder = async () => {
    const actionResult = await dispatch(cancelOrder(id));
    const result = unwrapResult(actionResult);

    if (result.success) {
      enqueueSnackbar('Order cancelled successfully', { variant: 'success' });

      if (hubConnection) {
        try {
          await hubConnection.invoke('NotifyAdminWhenOrderCancelled', order.id);
        } catch (error) {
          console.error(error);
        }
      };

      handleCloseConfirmCancelDialog();
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
      }

      handleCloseConfirmOrderReceivedDialog();
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

  return (
    <Box
      sx={{
        p: 1,
        borderRadius: (theme) => theme.spacing(1),
        border: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: (theme) => theme.palette.background.content
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Stack spacing={1}>
          <Typography variant='body1'>
            Order Number: #{orderNumber}
          </Typography>
          <Typography variant='body1'>
            Order Date: {fDateTime(createdDateTime)}
          </Typography>
        </Stack>
        <Label color={statusColor}>{orderStatus}</Label>
      </Box>
      <Box sx={{ mt: 1, mb: 3, borderBottom: `1px dashed`, borderColor: 'divider' }} />
      <Stack spacing={2}>
        {orderItems.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </Stack>
      <Box sx={{ my: 2, borderBottom: `1px dashed`, borderColor: 'divider' }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <Typography variant='body1'>Total</Typography>
        <Typography variant='h6' component='span' color='error'>{fCurrency(totalAmount + totalDiscount)}</Typography>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Stack spacing={2} direction='row'>
          {canCompleteOrder && (
            <>
              <LoadingButton
                color='primary'
                variant='outlined'
                onClick={handleOpenConfirmOrderReceivedDialog}
                loading={cancelOrderStatus === ACTION_STATUS.LOADING}
              >
                Confirm Received
              </LoadingButton>
              <ConfirmDialogV2
                dialogTitle='Confirm order received'
                dialogContent='Are you sure to confirm this order received?'
                open={openConfirmOrderReceivedDialog}
                handleClose={handleCloseConfirmOrderReceivedDialog}
                onConfirm={handleConfirmReceived}
                status={confirmOrderReceivedStatus}
              />
            </>
          )}
          {orderStatus === STATUS.PENDING && (
            <>
              <LoadingButton
                color='error'
                variant='outlined'
                onClick={handleOpenConfirmCancelDialog}
                loading={cancelOrderStatus === ACTION_STATUS.LOADING}
              >
                Cancel
              </LoadingButton>
              <ConfirmDialogV2
                dialogTitle='Confirm cancel order'
                dialogContent='Are you sure to cancel this order'
                open={openConfirmCancelDialog}
                handleClose={handleCloseConfirmCancelDialog}
                onConfirm={handleCancelOrder}
                status={cancelOrderStatus}
              />
            </>
          )}
          <Button
            LinkComponent={RouterLink}
            to={`${PATHS.USER_ORDERS}/${id}`}
            color='inherit'
            variant='outlined'
          >
            Details
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Order;
