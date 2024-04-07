import React, { useState } from "react";
import { alpha, useTheme } from "@mui/material/styles";
import {
  NavLink as RouterLink,
  Link as RLink,
  useLocation,
  matchPath,
} from "react-router-dom";
import {
  Box,
  Collapse,
  Link,
  List,
  ListItemText,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from "@mui/material";

import { StyledNavItem, StyledNavItemIcon } from "./styles";
import Iconify from "../iconify/Iconify";

const NavItem = ({ item, miniDrawer }) => {
  const { path, title, icon, info, children } = item;
  const theme = useTheme();
  const { pathname } = useLocation();
  const isActiveRoot = path
    ? !!matchPath({ path, end: false }, pathname)
    : false;

  const [open, setOpen] = useState(isActiveRoot);
  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = Boolean(anchorEl);

  const popoverId = openPopover ? `popover-${title}` : undefined;

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  if (children) {
    return (
      <>
        <StyledNavItem
          onClick={!miniDrawer ? handleToggle : handleOpenPopover}
          sx={{
            mb: 1,
            ...(isActiveRoot && {
              color: theme.palette.primary.main,
              backgroundColor: `${alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity
              )}`,
              fontWeight: "fontWeightBold",
            }),
          }}
          aria-describedby={popoverId}
        >
          {miniDrawer ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                position: "relative",
              }}
            >
              <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
              <Typography variant="iconLabel">{title}</Typography>
              <Iconify
                icon="material-symbols:arrow-forward-ios-rounded"
                width={10}
                height={10}
                sx={{
                  position: "absolute",
                  right: 4,
                  top: 8,
                  fontWeight: 700,
                }}
              />
            </Box>
          ) : (
            <>
              <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
              <ListItemText primary={title} />
              {info && info}
              <Iconify
                icon={
                  open
                    ? "eva:arrow-ios-downward-fill"
                    : "eva:arrow-ios-forward-fill"
                }
                sx={{ width: 16, height: 16, mx: 1 }}
              />
            </>
          )}
        </StyledNavItem>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          sx={{ display: miniDrawer ? "none" : "block" }}
        >
          <List component="div" disablePadding sx={{ p: 1 }}>
            {children.map((item) => {
              const { title, path } = item;

              return (
                <StyledNavItem
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    "&.active": {
                      color: theme.palette.primary.main,
                      fontWeight: "fontWeightBold",
                    },
                    "&.active .item-dot": {
                      transform: "scale(2)",
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <StyledNavItemIcon>
                    <Box
                      className="item-dot"
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: "flex",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "text.disabled",
                        transition: (theme) =>
                          theme.transitions.create("transform"),
                      }}
                    />
                  </StyledNavItemIcon>
                  <ListItemText disableTypography primary={title} />
                </StyledNavItem>
              );
            })}
          </List>
        </Collapse>
        <Popover
          id={popoverId}
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
        >
          <Stack sx={{ p: 1, minWidth: 200 }}>
            {children.map((item) => {
              const { path } = item;
              const isActive = path
                ? !!matchPath({ path, end: false }, pathname)
                : false;

              return (
                <Link
                  key={item.title}
                  component={RLink}
                  to={item.path}
                  underline="none"
                  color="text.primary"
                  onClick={handleClosePopover}
                  sx={{
                    borderRadius: 1,
                  }}
                >
                  <MenuItem sx={{ borderRadius: 1 }}>
                    <Typography
                      variant="body2"
                      textTransform="capitalize"
                      sx={{
                        ...(isActive && {
                          fontWeight: "bold",
                        }),
                      }}
                    >
                      {item.title}
                    </Typography>
                  </MenuItem>
                </Link>
              );
            })}
          </Stack>
        </Popover>
      </>
    );
  }

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&.active": {
          color: theme.palette.primary.main,
          backgroundColor: `${alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          )}`,
          fontWeight: "fontWeightBold",
        },
      }}
    >
      {miniDrawer ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
          <Typography variant="iconLabel">{title}</Typography>
        </Box>
      ) : (
        <>
          <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
          <ListItemText primary={title} />
        </>
      )}
      {info && info}
    </StyledNavItem>
  );
};

const NavSection = ({ data = [], miniDrawer, ...other }) => {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) =>
          item.path ? (
            <NavItem key={item.title} item={item} miniDrawer={miniDrawer} />
          ) : (
            !miniDrawer && (
              <Box
                sx={{
                  ml: 3,
                  mb: 0.5,
                  mt: 1,
                }}
                key={item.title}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  {item.title}
                </Typography>
              </Box>
            )
          )
        )}
      </List>
    </Box>
  );
};

export default NavSection;
