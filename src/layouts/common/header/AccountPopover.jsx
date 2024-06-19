import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import {
  IconButton,
  Avatar,
  Stack,
  Divider,
  Box,
  MenuItem,
  Popover,
  Typography,
  Link
} from "@mui/material";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { logout } from "../../../features/auth/authSlice";
import { clearNotifications } from "../../../features/common/notificationSlice";
import { clearData } from '../../../features/common/productFavoriteSlice';
import { clearData as clearCart } from '../../../features/common/cartSlice';
import ROLES from "../../../constants/userRoles";

const AccountPopover = ({ user, menuOptions }) => {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearNotifications());
    dispatch(clearData());
    dispatch(clearCart());
    setOpen(null);
    navigate('/');
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={user?.avatar} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${user?.firstName} ${user?.lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {user?.role === ROLES.ADMIN && (
            <Link
              component={RouterLink}
              to='/admin/dashboard'
              underline='none'
              color='text.primary'
              onClick={handleClose}
            >
              <MenuItem>
                Dashboard
              </MenuItem>
            </Link>
          )}
          {menuOptions.map((option) => (
            <Link
              key={option.label}
              component={RouterLink}
              to={option.path}
              underline='none'
              color='text.primary'
              onClick={handleClose}
            >
              <MenuItem>
                {option.label}
              </MenuItem>
            </Link>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
};

export default AccountPopover;
