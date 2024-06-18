import React from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import { Label } from '../../../components';

const HierarchicalList = ({ items, onNavigate, createURL, ...other }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <List {...other} dense>
      {items.map(item => (
        <>
          <ListItem
            disablePadding
            key={item.value}
            secondaryAction={
              <Label>{item.count}</Label>
            }
            onClick={() => {
              onNavigate(item.value);
            }}
          >
            <ListItemButton selected={item.isRefined}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
          {item.data && (
            <HierarchicalList
              items={item.data}
              onNavigate={onNavigate}
              createURL={createURL}
              sx={{ ml: 2 }}
            />
          )}
        </>
      ))}
    </List>
  );
};

export default HierarchicalList;
