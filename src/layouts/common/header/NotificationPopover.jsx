import React, { useState } from 'react';
import {
  Box,
  Badge,
  IconButton,
  Popover,
  Typography,
  Divider,
  List,
  Button,
  Tooltip
} from '@mui/material';

import { Iconify, Scrollbar } from '../../../components';
import NotificationItem from './NotificationItem';

const NOTIFICATIONS = [
  {
    id: '1',
    message: 'Your order is placed',
    domain: 'Orders',
    isRead: false,
    timestamp: '2021-06-12T09:30:00.000Z',
    from: {
      id: '1',
      name: 'Cameron Williamson',
    },
    to: {
      id: '2',
      name: 'You',
    }
  },
  {
    id: '2',
    message: 'Your order is shipped out',
    domain: 'Orders',
    isRead: false,
    timestamp: '2021-06-12T09:30:00.000Z',
    from: {
      id: '1',
      name: 'Cameron Williamson',
    },
    to: {
      id: '2',
      name: 'You',
    }
  },
  {
    id: '3',
    message: 'Your order is shipped out',
    domain: 'Orders',
    isRead: false,
    timestamp: '2021-06-12T09:30:00.000Z',
    from: {
      id: '1',
      name: 'Cameron Williamson',
    },
    to: {
      id: '2',
      name: 'You',
    }
  },
  {
    id: '4',
    message: 'Your order is shipped out',
    domain: 'Orders',
    isRead: false,
    timestamp: '2021-06-12T09:30:00.000Z',
    from: {
      id: '1',
      name: 'Cameron Williamson',
    },
    to: {
      id: '2',
      name: 'You',
    }
  },
  {
    id: '5',
    message: 'Your order is shipped out',
    domain: 'Orders',
    isRead: false,
    timestamp: '2021-06-12T09:30:00.000Z',
    from: {
      id: '1',
      name: 'Cameron Williamson',
    },
    to: {
      id: '2',
      name: 'You',
    }
  },
  {
    id: '6',
    message: 'Your order is shipped out',
    domain: 'Orders',
    isRead: false,
    timestamp: '2021-06-12T09:30:00.000Z',
    from: {
      id: '1',
      name: 'Cameron Williamson',
    },
    to: {
      id: '2',
      name: 'You',
    }
  },
  {
    id: '7',
    message: 'Your order is shipped out',
    domain: 'Orders',
    isRead: false,
    timestamp: '2021-06-12T09:30:00.000Z',
    from: {
      id: '1',
      name: 'Cameron Williamson',
    },
    to: {
      id: '2',
      name: 'You',
    }
  },
  {
    id: '8',
    message: 'Your order is shipped out',
    domain: 'Orders',
    isRead: false,
    timestamp: '2021-06-12T09:30:00.000Z',
    from: {
      id: '1',
      name: 'Cameron Williamson',
    },
    to: {
      id: '2',
      name: 'You',
    }
  },
  {
    id: '9',
    message: 'Your order is shipped out',
    domain: 'Orders',
    isRead: false,
    timestamp: '2021-06-12T09:30:00.000Z',
    from: {
      id: '1',
      name: 'Cameron Williamson',
    },
    to: {
      id: '2',
      name: 'You',
    }
  },
  {
    id: '10',
    message: 'Your order is shipped out',
    domain: 'Orders',
    isRead: false,
    timestamp: '2021-06-12T09:30:00.000Z',
    from: {
      id: '1',
      name: 'Cameron Williamson',
    },
    to: {
      id: '2',
      name: 'You',
    }
  },
];

const NotificationPopover = () => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const totalUnRead = notifications.filter((item) => item.isRead === false).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
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
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default NotificationPopover;
