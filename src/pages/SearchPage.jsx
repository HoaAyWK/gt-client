import React from 'react';
import { Box, Divider, Grid } from '@mui/material';

import { SearchRefinement, SearchResult, RangeSlider } from '../features/search';
import SortByPriceButtons from '../features/search/SortByPriceButtons';

const SEARCH_INDEX = import.meta.env.VITE_ALGOLIA_INDEX;
const sortByItems = [
  { label: 'Price', value: SEARCH_INDEX },
  { label: 'Price (asc)', value: `${SEARCH_INDEX}_price_asc` },
  { label: 'Price (desc)', value: `${SEARCH_INDEX}_price_desc` },
];

const SearchPage = () => {

  return (
    <Grid container spacing={2} sx={{ pt: 2 }}>
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            p: 2,
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: 1,
          }}
        >
          <SearchRefinement
            label='categories'
            attribute='categories'
            sortBy={['name:asc', 'count:desc']}
            limit={5}
            showMore={true}
          />
          <Divider sx={{ my: 2 }} />
          <SearchRefinement
            label='brands'
            attribute='brand'
            sortBy={['name:asc', 'count:desc']}
            limit={5}
            showMore={true}
          />
          <Divider sx={{ mb: 2 }} />
          <RangeSlider attribute='price' label='price' />
          <Divider sx={{ my: 2 }} />
          <SearchRefinement
            label='Model'
            attribute='model'
            sortBy={['name:asc', 'count:desc']}
            limit={5}
            showMore={true}
          />
          <Divider sx={{ mb: 2 }} />
          <SearchRefinement
            label='Specifications'
            attribute='specifications'
            sortBy={['name:asc', 'count:desc']}
            limit={5}
            showMore={true}
          />
          <Divider sx={{ mb: 2 }} />
          <SearchRefinement
            label='Color'
            attribute='color'
            sortBy={['name:asc', 'count:desc']}
            limit={5}
            showMore={true}
          />
          <Divider sx={{ mb: 2 }} />

        </Box>
      </Grid>
      <Grid item xs={12} md={9}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            mb: 2,
            backgroundColor: (theme) => theme.palette.background.neutral,
            p: 1,
            borderRadius: 1
          }}
        >
          <SortByPriceButtons items={sortByItems} />
        </Box>
        <SearchResult />
      </Grid>
    </Grid>
  );
};

export default SearchPage;
