import React from 'react';
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';

import { Iconify } from '../../../components';

import { fToNow } from '../../../utils/formatTime';
import orderIcon from '../../../assets/icons/ic_notification_package.svg';
import shippingIcon from '../../../assets/icons/ic_notification_shipping.svg';

const renderContent = (notification) => {
  const title = (
    <Typography variant="subtitle2">
      {notification.message}
    </Typography>
  );

  if (notification.domain === 'Orders') {
    return {
      avatar: <img alt={notification.message} src={orderIcon} />,
      title,
    };
  }

  if (notification.domain === 'Shipping') {
    return {
      avatar: <img alt={notification.message} src={shippingIcon} />,
      title,
    };
  }

  return {
    avatar: notification.avatar ? <img alt={notification.message} src={notification.avatar} /> : null,
    title,
  };
}

const NotificationItem = ({ notification }) => {
    const { avatar, title } = renderContent(notification);
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
