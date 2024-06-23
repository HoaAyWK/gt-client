import React, { Fragment, useEffect, useMemo } from 'react';
import { useRefinementList } from 'react-instantsearch';
import { Box, Breadcrumbs, Divider, Grid, Link, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';

import {
  SearchRefinement,
  SearchResult,
  RangeSlider,
  HierarchicalMenu as CustomHierarchicalMenu
} from '../features/search';
import { LoadingPage, Page } from '../components';
import SortByPriceButtons from '../features/search/SortByPriceButtons';
import ACTION_STATUS from '../constants/actionStatus';
import { getAlgoliaIndexSettings } from '../features/search/searchSlice';

const SEARCH_INDEX = import.meta.env.VITE_ALGOLIA_INDEX;
const sortByItems = [
  { label: 'Price', value: SEARCH_INDEX },
  { label: 'Price ascending', value: `${SEARCH_INDEX}_price_asc` },
  { label: 'Price descending', value: `${SEARCH_INDEX}_price_desc` },
  { label: 'Latest products', value: `${SEARCH_INDEX}_latest_products` },
];

const BrandPage = () => {
  const { brand } = useParams();
  const dispatch = useDispatch();
  const { indexSettings, getIndexSettingsStatus } = useSelector((state) => state.search);
  const { items, refine } = useRefinementList({ attribute: 'brand' });

  console.log('brand items', items);

  useEffect(() => {
    if (getIndexSettingsStatus === ACTION_STATUS.IDLE) {
      dispatch(getAlgoliaIndexSettings());
    }
  }, []);


  useEffect(() => {
    items.forEach((item) => {
      if (item.value.toLocaleLowerCase() === brand.toLocaleLowerCase() && !item.isRefined) {
        refine(item.value);
      }
    })
  }, [items]);

  const attributesForFaceting = useMemo(() => {
    if (indexSettings && indexSettings.attributesForFaceting) {
      return indexSettings.attributesForFaceting.filter((facet) =>
        !facet.includes('categories') &&
        !facet.includes('price') &&
        !facet.includes('finalPrice') &&
        !facet.includes('categorySlug'))
        .map((facet) => {
          if (facet.includes('.')) {
            return { label: facet.split('.')[1], facet: facet } ;
          }

          return { label: facet, facet: facet } ;
        });
    }

    return [];
  }, [indexSettings]);

  const hierarchyAttributes = useMemo(() => {
    if (indexSettings && indexSettings.attributesForFaceting) {
      return indexSettings.attributesForFaceting.filter((facet) => facet.includes('categories'));
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
    <Page title='Brand' sx={{ mt: 12 }}>
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
                  <CustomHierarchicalMenu
                    label='Categories'
                    attributes={hierarchyAttributes}
                    showMore={true}
                  />
                  <Divider sx={{ mb: 1 }} />
                </>
              )}
              <RangeSlider label='Price' attribute='finalPrice' />
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
                borderRadius: 1,
                alignItems: 'center'
              }}
            >
              <Typography variant='body1' color='text.primary' sx={{ mr: 2 }}>Sort by</Typography>
              <SortByPriceButtons items={sortByItems} />
            </Box>
            <SearchResult />
          </Grid>
        </Grid>
      </Page>
  );
};

export default BrandPage;
