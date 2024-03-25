import React, { useEffect, useMemo } from 'react';
import { Button, Stack, } from '@mui/material';
import { useSortBy } from 'react-instantsearch-hooks-web';

const SortByPriceButtons = (props) => {
  const {
    currentRefinement,
    options,
    refine
  } = useSortBy(props);

  const sorts = useMemo(() => {
    return options.slice(1);
  }, [options]);

  return (
    <Stack spacing={1} direction='row'>
      {sorts.map((option) => (
        <Button
          key={option.label}
          color={option.value === currentRefinement ? 'primary' : 'inherit'}
          onClick={() => { refine(option.value); }}
        >
          {option.label}
        </Button>
      ))}
    </Stack>
  );
};

export default SortByPriceButtons;
