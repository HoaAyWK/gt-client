import React, { useState } from 'react';
import { Button, List, Stack, Typography } from '@mui/material';
import { useRefinementList } from 'react-instantsearch';

import { SearchBox } from './components';
import RefinementItem from './RefinementItem';

const SearchRefinementList = (props) => {
  const { searchable, label } = props;
  const [filter, setFilter] = useState('');
  const { items, refine, canToggleShowMore, isShowingMore, toggleShowMore, searchForItems } = useRefinementList(props);

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
        {searchable && <SearchBox title='categories' filter={filter} onFilter={handleFilter} />}
        <List dense>
          {items.map((item) => (
            <RefinementItem
              key={item.value}
              item={item}
              refine={refine}
              onToggle={handleToggle}
            />
          ))}
          {canToggleShowMore && (
            <Button
              onClick={toggleShowMore}
              fullWidth
            >
              {isShowingMore ? 'Show less' : 'Show more'}
            </Button>
          )}
        </List>
      </Stack>
    </Stack>
  );
};

export default SearchRefinementList;
