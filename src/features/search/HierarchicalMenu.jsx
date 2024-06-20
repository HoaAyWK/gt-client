import React, { useState, useMemo } from 'react';
import { Button, List, Stack, Typography } from '@mui/material';
import { useHierarchicalMenu } from 'react-instantsearch-hooks-web';

import { HierarchicalList } from './components';

const HierarchicalMenu = (props) => {
  const { label, exclude } = props;
  const [filter, setFilter] = useState('');
  const {
    items,
    refine,
    createURL,
  } = useHierarchicalMenu(props);

  const handleToggle = (value) => {
    refine(value);
  };

  const itemsToShow = useMemo(() => {
    if (exclude) {
      return items.filter((item) => item.value !== exclude);
    }

    return items;
  }, [items, exclude]);

  console.log('items', items);

  const handleFilter = (e) => {
    setFilter(e.target.value);
    searchForItems(e.target.value);
  };

  return (
    <Stack spacing={0.5}>
      <Typography variant='subtitle2' color='text.secondary' textTransform='uppercase'>
        {label}
      </Typography>
      <Stack spacing={1}>
        <HierarchicalList
          items={itemsToShow}
          onNavigate={refine}
          createURL={createURL}
        />
      </Stack>
    </Stack>
  );
};

export default HierarchicalMenu;
