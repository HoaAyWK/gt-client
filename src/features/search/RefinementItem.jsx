import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText } from '@mui/material';

const RefinementItem = ({ item, onToggle, refine }) => {
  const { value, isRefined, label } = item;

  const handleToggle = (value) => () => {
    onToggle(value);
  };

  return (
    <ListItem disablePadding disableGutters>
      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
        <ListItemIcon>
          <Checkbox
            edge='end'
            checked={isRefined}
            tabIndex={-1}
            inputProps={{ 'aria-label': label }}
          />
        </ListItemIcon>
        <ListItemText id={label} primary={label} />
      </ListItemButton>
    </ListItem>
  );
};

export default RefinementItem;
