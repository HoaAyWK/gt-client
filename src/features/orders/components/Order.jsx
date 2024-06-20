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
import { STATUS } from '../../../constants/orderStatus';
import { PAYMENT_OPTIONS } from '../../../constants/payment';
import OrderItem from './OrderItem';
import PATHS from '../../../constants/paths';
import ConfirmDialogV2 from '../../common/ConfirmDialogV2';
import { cancelOrder } from '../orderSlice';
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
  const { cancelOrderStatus } = useSelector((state) => state.orders);

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
      setOpenConfirmCancelDialog(false);

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
          <Button LinkComponent={RouterLink} to={`${PATHS.USER_ORDERS}/${id}`} color='inherit' variant='outlined'>Details</Button>
          {orderStatus === STATUS.PENDING && paymentMethod === PAYMENT_OPTIONS.CASH && (
            <>
              <LoadingButton
                color='error'
                variant='outlined'
                onClick={handleOpenConfirmCancelDialog}
                loading={cancelOrderStatus === ACTION_STATUS.LOADING ? true : false}
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
        </Stack>
      </Box>
    </Box>
  );
};

export default Order;
