import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import LineItemTable from './components/LineItemTable';
import { Iconify, Label, LoadingPage } from '../../components';
import { getSingleBill } from '../common/orderSlice';
import ACTION_STATUS from '../../constants/actionStatus';
import { fDateTime } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
import { PAYMENT_OPTIONS } from '../../constants/payment';
import { STATUS } from '../../constants/orderStatus';
import ConfirmDialog from '../common/ConfirmDialog';
import { cancelOrder, refresh } from '../common/orderSlice';
import { getOrders } from '../admin/order/orderSlice';

const OrderDetails = ({ id }) => {
  const dispatch = useDispatch();
  const { getSingleBillStatus, bill, cancelOrderStatus } = useSelector((state) => state.orders);
  const { createReviewStatus } = useSelector((state) => state.productReviews);
  const [openConfirmCancelDialog, setOpenConfirmCancelDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getSingleBill(id));
  }, [id]);

  useEffect(() => {
    if (createReviewStatus === ACTION_STATUS.SUCCEEDED) {
      dispatch(getSingleBill(id));
      dispatch(refresh());
    }
  }, [createReviewStatus]);

  useEffect(() => {
    if (cancelOrderStatus === ACTION_STATUS.SUCCEEDED) {
      enqueueSnackbar('Cancel successfully', { variant: 'success' });
      dispatch(refresh());
      dispatch(getOrders());
    }
  }, [cancelOrderStatus]);

  const handleOpenConfirmCancelDialog = () => {
    setOpenConfirmCancelDialog(true);
  };

  const handleCloseConfirmCancelDialog = () => {
    setOpenConfirmCancelDialog(false);
  };

  const labelColor = (status) => {
    if (status === STATUS.PAID) {
      return 'primary';
    }

    if (status === STATUS.PROCESSING) {
      return 'warning';
    }

    return 'error';
  };

  if (getSingleBillStatus === ACTION_STATUS.IDLE ||
      getSingleBillStatus === ACTION_STATUS.LOADING) {
    return <LoadingPage />;
  }

  if (getSingleBillStatus === ACTION_STATUS.FAILED) {
    return <Navigate to='/' />;
  }

  return (
    <Box>
      {bill?.status === STATUS.PROCESSING && bill?.paymentType === PAYMENT_OPTIONS.CASH && (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Button
              variant='outlined'
              color='error'
              onClick={handleOpenConfirmCancelDialog}
            >
              Cancel
            </Button>
          </Box>
          <ConfirmDialog
            dialogTitle='Confirm cancel order'
            dialogContent='Are you sure to cancel this order'
            open={openConfirmCancelDialog}
            handleClose={handleCloseConfirmCancelDialog}
            billId={id}
            action={cancelOrder}
            status={cancelOrderStatus}
          />
        </>
      )}
      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alginItems: 'start',
              mb: 4
            }}
          >
            <Typography variant='h6' component='h1' sx={{ mb: 2 }}>
              Order Details
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                <Label color={labelColor(bill?.status)}>{bill?.status}</Label>
              </Box>
              <Typography variant='subtitle1'>ID: {bill?.id}</Typography>
            </Box>
          </Box>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={0.5}>
                <Typography variant='subtitle1' color='text.secondary' textTransform='uppercase'>
                  Order Date
                </Typography>
                <Typography variant='body2' color='text.primary'>{fDateTime(bill?.orderDate)}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={0.5}>
                <Typography variant='subtitle1' color='text.secondary' textTransform='uppercase'>
                  To
                </Typography>
                <Typography variant='body2' color='text.primary'>{bill?.shippingAddress?.acceptorName}</Typography>
                <Typography variant='body2' color='text.primary'>{bill?.shippingAddress?.acceptorPhone}</Typography>
                <Typography variant='body2' color='text.primary'>{bill?.shippingAddress?.deliveryAddress}</Typography>
              </Stack>
            </Grid>
          </Grid>
          <LineItemTable items={bill?.orderItems} status={bill?.status} orderUser={bill?.userId} />
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}
          >
            <Stack spacing={2} direction='row'>
              <Typography variant='subtitle1'>Total</Typography>
              <Typography variant='subtitle1'>{fCurrency(bill?.price)}</Typography>
            </Stack>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Stack spacing={2}>
            <Typography variant='subtitle1' color='text.secondary' textTransform='uppercase'>
              Payment method
            </Typography>
            <Stack spacing={1} direction='row' alignItems='center'>
              <Iconify
                icon={bill?.paymentType === PAYMENT_OPTIONS.CASH ? 'ph:money' : 'material-symbols:credit-card-outline'}
                width={24}
                height={24}
              />
              <Typography variant='body1' textTransform='capitalize'>{bill?.paymentType}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderDetails;
