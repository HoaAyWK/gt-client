import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Button,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Link,
  useMediaQuery,
  Badge,
  Container,
} from "@mui/material";
// utils
// components
import { Iconify } from "../../../components";
//
import { AccountPopover, NotificationPopover } from "../../common/header";
import {
  useAppThemeUpdate,
  useAppTheme,
} from "../../../context/AppThemeContext";
import { useLocalStorage } from "../../../hooks";
import AlgoliaSearch from "./search-bar/AlgoliaSearch";
import hciLogo from "/new_hci_logo.svg";
import { useDispatch, useSelector } from "react-redux";
import ACTION_STATUS from "../../../constants/actionStatus";
import { getCart } from "../../../features/common/cartSlice";
import { getCategoryTree, selectAllCategories } from "../../../features/common/categorySlice";
import CategoryPopover from "./CategoryPopover";
import PATHS from "../../../constants/paths";
// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  width: `100%`,
  WebkitBackdropFilter: "blur(6px)",
  backdropFilter: "blur(6px)",
  backgroundColor: alpha(theme.palette.background.default, 0.5),
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  paddingLeft: "0px !important",
  paddingRight: "0px !important",
}));

const StyledTextLogo = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(.25turn, #7F0E0E, #0F0D73)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    display: "none",
  },
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.content, 0.1),
  WebkitBackdropFilter: "blur(6px)",
  backdropFilter: "blur(6px)",
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

const menuItems = [
  {
    name: "Products",
    path: "/products",
  },
];

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill",
    path: PATHS.HOME,
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
    path: PATHS.USER_ACCOUNT_PROFILE,
  },
  {
    label: "Orders",
    icon: "eva:settings-2-fill",
    path: PATHS.USER_ORDERS,
  },
];

export default function Header({ user, onOpenNav }) {
  const dispatch = useDispatch();
  const [, setModeValueStored] = useLocalStorage("darkMode", null);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { cart, getCartStatus } = useSelector((state) => state.cart);
  const { getCategoryTreeStatus } = useSelector((state) => state.categories);
  const categories = useSelector(selectAllCategories);
  const totalItems = useMemo(() => {
    if (!cart) {
      return 0;
    }

    if (cart.items.length) {
      const initialValue = 0;
      return cart.items.reduce(
        (sum, item) => sum + item.quantity,
        initialValue
      );
    }

    return 0;
  }, [cart]);
  const darkTheme = useAppTheme();
  const { setLightMode, setDarkMode } = useAppThemeUpdate();

  const applyLightMode = () => {
    setLightMode();
    setModeValueStored(false);
  };

  const applyDarkMode = () => {
    setDarkMode();
    setModeValueStored(true);
  };

  const toggleTheme = (isDark) => () => {
    if (isDark === null) {
      if (prefersDarkMode) {
        applyLightMode();
      } else {
        applyLightMode();
      }
    } else if (isDark === false) {
      applyDarkMode();
    } else {
      applyLightMode();
    }
  };

  const icon = () => {
    if (darkTheme === null) {
      if (prefersDarkMode) return "ic:twotone-light-mode";
      else return "material-symbols:dark-mode";
    } else if (darkTheme === false) {
      return "material-symbols:dark-mode";
    } else {
      return "ic:twotone-light-mode";
    }
  };

  useEffect(() => {
    if (getCartStatus === ACTION_STATUS.IDLE) {
      dispatch(getCart());
    }
  }, [getCartStatus]);

  useEffect(() => {
    if (getCategoryTreeStatus === ACTION_STATUS.IDLE) {
      dispatch(getCategoryTree());
    }
  }, []);

  return (
    <StyledRoot>
      <Container maxWidth="lg">
        <Box sx={{ width: '100%'}}>
          <StyledToolbar>
            <IconButton
              onClick={onOpenNav}
              sx={{
                mr: 1,
                color: "text.primary",
                display: { lg: "none" },
              }}
            >
              <Iconify icon="eva:menu-2-fill" />
            </IconButton>

            <StyledBox sx={{ mr: 2 }}>
              <Link
                component={RouterLink}
                to="/"
                underline="none"
                sx={{ display: "inline-flex", alginItems: "center" }}
              >
                <Box component="img" alt="Logo" src={hciLogo} sx={{ mr: 1 }} />
                <StyledTextLogo variant="h3" component="h1">
                  EStore
                </StyledTextLogo>
              </Link>
            </StyledBox>

            <AlgoliaSearch />

            <Stack direction="row" spacing={2} sx={{ ml: 2, display: "none" }}>
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  underline="none"
                  color="text.primary"
                >
                  <Button>{item.name}</Button>
                </Link>
              ))}
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Stack
              direction="row"
              alignItems="center"
              spacing={{
                xs: 0.5,
                sm: 1,
              }}
            >
              <IconButton onClick={toggleTheme(darkTheme)}>
                <Iconify icon={icon()} width={24} height={24} />
              </IconButton>
              {user && (
                <NotificationPopover />
              )}
              <IconButton LinkComponent={RouterLink} to="/checkout" underline="none" size="medium" color="default">
                <Badge badgeContent={totalItems} color="error">
                  <Iconify
                    icon="eva:shopping-bag-fill"
                    width={28}
                    height={28}
                  />
                </Badge>
              </IconButton>
              {user ? (<AccountPopover user={user} menuOptions={MENU_OPTIONS} />)
                : (<Button
                    LinkComponent={RouterLink}
                    to='/login'
                    variant='text'
                    color='primary'
                    sx={{
                      borderRadius: 2
                    }}
                  >
                    <Iconify icon='material-symbols:account-circle' width={24} height={24} />
                    &nbsp;
                    Login
                  </Button>)
              }
            </Stack>
          </StyledToolbar>
          {categories.length > 0 && (
            <StyledStack
              direction="row"
              spacing={3}
            >
              {categories.map((category) => (
                <CategoryPopover key={category.id} category={category} />
              ))}
            </StyledStack>
          )}
        </Box>
      </Container>
    </StyledRoot>
  );
}
