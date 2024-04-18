import React, { useState } from "react";
import {
  Box,
  Stack,
  MenuItem,
  Popover,
  Typography,
  Link
} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';

const CategoryPopover = ({ category }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'categoryMenu',
  });

  const { isOpen } = popupState;

  return (
    <>
      <Box
        sx={{
          pb: 1,
          cursor: 'pointer',
          borderBottom: (theme) => isOpen ? `1px solid ${theme.palette.primary}` : 'none',
          textDecoration: 'none',
        }}
        {...bindHover(popupState)}
        component={RouterLink}
        to={`/category/${category.slug}`}
      >
          <Typography
            color={isOpen ? 'primary' : 'text.primary'}
          >
            {category.name}
          </Typography>
      </Box>
      <HoverMenu
        {...bindMenu(popupState)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{ mt: 0 }}
      >
        {category.children.map((childCategory) => (
          <Link
            key={childCategory.name}
            component={RouterLink}
            to={`/category/${childCategory.slug}`}
            underline='none'
            color='text.primary'
          >
            <MenuItem>
              {childCategory.name}
            </MenuItem>
          </Link>
          ))}
      </HoverMenu>
    </>
  );
};

export default CategoryPopover;
