import React, { useState, useMemo } from 'react';
import { useRecommendations } from '@algolia/recommend-react';
import recommend from '@algolia/recommend';
import { Grid, Box, Button, Typography } from '@mui/material';
import { useHits } from 'react-instantsearch-hooks-web';

import { SearchHit } from '../../search/components';

const APP_ID = import.meta.env.VITE_ALGOLIA_APP_ID;
const API_KEY = import.meta.env.VITE_ALGOLIA_API_KEY;
const INDEX_NAME = import.meta.env.VITE_ALGOLIA_INDEX;
const recommendClient = recommend(APP_ID, API_KEY);

const RelatedProducts = ({ currentObjectID }) => {
  const { sendEvent } = useHits();
  const [perPage, setPerPage] = useState(4);
  const [page, setPage] = useState(1);
  const { recommendations } = useRecommendations({
    model: 'related-products',
    recommendClient,
    indexName: INDEX_NAME,
    objectIDs: [currentObjectID]
  });

  const canShowMore = useMemo(() => {
    if (recommendations?.length > 0 && recommendations.length > page * perPage) {
      return true;
    }

    return false;
  }, [recommendations, page]);

  const productsToShow = useMemo(() => {
    if (recommendations?.length > 0) {
      return recommendations.slice(0, page * perPage);
    }

    return [];
  }, [recommendations, page]);

  const productsLeft = useMemo(() => {
    if (recommendations?.length > page * perPage) {
      return recommendations.length - (page * perPage);
    }

    return 0;
  }, [page, recommendations]);

  const handleClickShowMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      {recommendations?.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant='h5' component='h1' color='text.primary'>
            Related Products
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2} >
              {productsToShow.map((product) => (
                <Grid item key={product.objectID} xs={12} sm={6} md={4} lg={3}>
                  <SearchHit hit={product} sendEvent={sendEvent} />
                </Grid>
              ))}
            </Grid>
            {canShowMore && (
              <Box
                sx={{
                  display: 'flex',
                  mt: 2,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Button variant='outlined' onClick={handleClickShowMore}>
                  Show More {productsLeft} {productsLeft > 1 ? 'products' : 'product' }
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default RelatedProducts;
