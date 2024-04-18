import React, { useState } from 'react';
import { Button, List, Stack, Typography } from '@mui/material';
import { useHierarchicalMenu } from 'react-instantsearch-hooks-web';

import { HierarchicalList } from './components';

const HierarchicalMenu = (props) => {
  const { label } = props;
  const [filter, setFilter] = useState('');
  const { items, refine, canToggleShowMore, isShowingMore, toggleShowMore, searchForItems } = useHierarchicalMenu(props);
  const handleToggle = (value) => {
    refine(value);
  };

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
        <HierarchicalList items={items} />
      </Stack>
    </Stack>
  );
};

export default HierarchicalMenu;
