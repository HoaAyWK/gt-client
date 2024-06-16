import React, { useMemo } from 'react';
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { Iconify } from '../../../components';

import PATHS from '../../../constants/paths';
import { fToNow } from '../../../utils/formatTime';
import orderIcon from '../../../assets/icons/ic_notification_package.svg';
import pickupIcon from '../../../assets/icons/ic_notification_pickup.svg';
import orderConfirmedIcon from '../../../assets/icons/order_confirmed.png';
import shippingIcon from '../../../assets/icons/ic_notification_shipping.svg';
import { markNotificationAsRead } from '../../../features/common/notificationSlice';

const renderContent = (notification) => {
  const title = (
    <Typography variant="subtitle2">
      {notification.message}
    </Typography>
  );

  if (notification.type === 'OrderReceived') {
    return {
      avatar: <img alt={notification.message} src={orderIcon} />,
      title,
    };
  }

  if (notification.type === 'InTransit') {
    return {
      avatar: <img alt={notification.message} src={shippingIcon} />,
      title,
    };
  }

  if (notification.type === 'OrderShippedOut') {
    return {
      avatar: <img alt={notification.message} src={pickupIcon} style={{ objectFit: 'cover', width: 24 }} />,
      title,
    }
  }

  if (notification.type === 'PaymentInfoConfirmed') {
    return {
      avatar: <img alt={notification.message} src={orderConfirmedIcon} style={{ objectFit: 'cover', width: 24 }} />,
      title,
    }
  }

  return {
    avatar: notification.avatar ? <img alt={notification.message} src={notification.avatar} /> : null,
    title,
  };
}

const NotificationItem = ({ notification, onClick }) => {
    const { avatar, title } = renderContent(notification);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const orderUrl = useMemo(() => {
      if (notification?.domain === 'Order') {
        return `${PATHS.USER_ORDERS}/${notification?.entityId}`
      }

      return '#';
    }, [notification]);

    const handleClick = async () => {
      if (notification.isRead) {
        onClick();
        return;
      }

      const actionResult = await dispatch(markNotificationAsRead(notification.id));
      const result = unwrapResult(actionResult);

      if (result.success) {
        onClick();
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
      <ListItemButton
        sx={{
          py: 1.5,
          px: 2.5,
          mt: '1px',
          ...(!notification.isRead && {
            bgcolor: 'action.selected',
          }),
        }}
        LinkComponent={RouterLink}
        to={orderUrl}
        onClick={handleClick}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled',
              }}
            >
              <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
              {fToNow(notification.timestamp)}
            </Typography>
          }
        />
      </ListItemButton>
    );
};

export default NotificationItem;
