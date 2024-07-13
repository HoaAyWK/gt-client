import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Badge,
  IconButton,
  Typography,
  Divider,
  List,
  Button,
  Tooltip
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { Iconify, Scrollbar, MenuPopover } from '../../../components';
import NotificationItem from './NotificationItem';
import {
  selectAllNotifications,
  getNotifications,
  markAllNotificationsAsRead
} from '../../../features/common/notificationSlice';
import ACTION_STATUS from '../../../constants/actionStatus';


const NotificationPopover = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const [open, setOpen] = useState(null);
  const { user } = useSelector(state => state.auth);
  const { getNotificationsStatus } = useSelector(state => state.notifications);

  const totalUnRead = useMemo(() => {
    if (notifications.length === 0) {
      return 0;
    }
    return notifications.filter((item) => item.isRead === false).length;
  }, [notifications]);

  const sortedNotifications = useMemo(() => {
    return notifications.toSorted((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [notifications]);

  useEffect(() => {
    if (getNotificationsStatus === ACTION_STATUS.IDLE && user) {
      dispatch(getNotifications(user.id));
    }
  }, [getNotificationsStatus, user]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = async () => {
    const actionResult = await dispatch(markAllNotificationsAsRead());
    const result = unwrapResult(actionResult);

    if (result.success) {

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
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <MenuPopover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List disablePadding>
            {sortedNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={handleClose}
              />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

export default NotificationPopover;
