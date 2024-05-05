import React, { Fragment, useEffect, useMemo } from 'react';
import { Box, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { SearchRefinement, SearchResult, RangeSlider, HierarchicalMenu } from '../features/search';
import { LoadingPage, Page } from '../components';
import SortByPriceButtons from '../features/search/SortByPriceButtons';
import ACTION_STATUS from '../constants/actionStatus';
import { getAlgoliaIndexSettings } from '../features/search/searchSlice';

const SEARCH_INDEX = import.meta.env.VITE_ALGOLIA_INDEX;
const sortByItems = [
  { label: 'Price', value: SEARCH_INDEX },
  { label: 'Price (asc)', value: `${SEARCH_INDEX}_price_asc` },
  { label: 'Price (desc)', value: `${SEARCH_INDEX}_price_desc` },
];

const SearchPage = () => {
  const dispatch = useDispatch();
  const { indexSettings, getIndexSettingsStatus } = useSelector((state) => state.search);

  useEffect(() => {
    if (getIndexSettingsStatus === ACTION_STATUS.IDLE) {
      dispatch(getAlgoliaIndexSettings());
    }
  }, []);


  const hierarchyAttributes = useMemo(() => {
    if (indexSettings && indexSettings.attributesForFaceting) {
      return indexSettings.attributesForFaceting.filter((facet) => facet.includes('categories'));
    }

    return [];
  }, [indexSettings]);

  console.log(hierarchyAttributes);

  const attributesForFaceting = useMemo(() => {
    if (indexSettings && indexSettings.attributesForFaceting) {
      return indexSettings.attributesForFaceting.filter((facet) => !facet.includes('categories') && !facet.includes('price'))
        .map((facet) => {
          if (facet.includes('.')) {
            return { label: facet.split('.')[1], facet: facet } ;
          }

          return { label: facet, facet: facet } ;
        });
    }

    return [];
  }, [indexSettings]);

  if (getIndexSettingsStatus === ACTION_STATUS.IDLE ||
    getIndexSettingsStatus ===  ACTION_STATUS.LOADING) {
    return (<LoadingPage />);
  }

  if (getIndexSettingsStatus === ACTION_STATUS.FAILED) {
    return (<Box>Something went wrong</Box>);
  }

  return (
    <Page title='Search Products' sx={{ mt: 12 }}>
      <Grid container spacing={2} sx={{ pt: 2 }}>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              p: 2,
              backgroundColor: (theme) => theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            {hierarchyAttributes.length > 0 && (
              <>
                <HierarchicalMenu
                  label='Categories'
                  attributes={hierarchyAttributes}
                  limit={5}
                  showMore={true}
                />
                <Divider sx={{ mb: 1 }} />
              </>
            )}
            <RangeSlider label='Price' attribute='price' />
            {attributesForFaceting.map(attribute => (
              <Fragment key={attribute.facet}>
                <Divider sx={{ my: 1 }} />
                <SearchRefinement
                  key={attribute.facet}
                  label={attribute.label}
                  attribute={attribute.facet}
                  sortBy={['name:asc', 'count:desc']}
                  limit={5}
                  showMore={true}
                />
              </Fragment>
            ))}
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
    </Page>
  );
};

export default SearchPage;
