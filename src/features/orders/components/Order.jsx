import React, { useState } from 'react';
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
  const { enqueueSnackbar } = useSnackbar();
  const { cancelOrderStatus } = useSelector((state) => state.orders);

  const labelColor = (status) => {
    if (status === STATUS.PAID) {
      return 'primary';
    } else if (status === STATUS.PROCESSING) {
      return 'warning';
    } else if (status === STATUS.DELIVERED) {
      return 'success';
    } return 'error';
  };

  const handleOpenConfirmCancelDialog = () => {
    setOpenConfirmCancelDialog(true);
  };

  const handleCloseConfirmCancelDialog = () => {
    setOpenConfirmCancelDialog(false);
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
        <Label color={labelColor(orderStatus)}>{orderStatus}</Label>
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
        <Typography variant='h6' component='span' color='error'>{fCurrency(totalAmount)}</Typography>
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
          {orderStatus === STATUS.PROCESSING && paymentType === PAYMENT_OPTIONS.CASH && (
            <>
              <LoadingButton
                color='error'
                variant='outlined'
                onClick={handleOpenConfirmCancelDialog}
                loading={cancelOrderStatus === ACTION_STATUS.LOADING ? true : false}
              >
                Cancel
              </LoadingButton>
              <ConfirmDialog
                dialogTitle='Confirm cancel order'
                dialogContent='Are you sure to cancel this order'
                open={openConfirmCancelDialog}
                handleClose={handleCloseConfirmCancelDialog}
                itemId={id}
                // action={cancelOrder}
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
