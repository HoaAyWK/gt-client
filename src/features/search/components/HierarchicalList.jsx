import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

const HierarchicalList = ({ items }) => {
  return (
    <List dense>
      {items.map(item => (
        <ListItem
          disablePadding
          key={item.value}
          secondaryAction={
            <Typography
              edge="end"
              variant='body2'
            >
              {item.count}
            </Typography>
          }
        >
          <ListItemButton>
            <ListItemText primary={item.label} />
          </ListItemButton>
          {item.data && (
            <HierarchicalList items={item.data} />
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default HierarchicalList;
