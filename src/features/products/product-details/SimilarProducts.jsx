import React, { useState, useMemo } from 'react';
import { useLookingSimilar } from 'react-instantsearch';
import { Grid, Box, Button, Typography } from '@mui/material';
import { useHits } from 'react-instantsearch';

import { SearchHit } from '../../search/components';

const RelatedProducts = ({ currentObjectID }) => {
  const { sendEvent } = useHits();
  const [perPage, setPerPage] = useState(4);
  const [page, setPage] = useState(1);
  const { items } = useLookingSimilar({ objectIDs: [currentObjectID] });

  console.log(currentObjectID)
  console.log('looking similar products', items);

  const canShowMore = useMemo(() => {
    if (items?.length > 0 && items.length > page * perPage) {
      return true;
    }

    return false;
  }, [items, page]);

  const productsToShow = useMemo(() => {
    if (items?.length > 0) {
      return items.slice(0, page * perPage);
    }

    return [];
  }, [items, page]);

  const productsLeft = useMemo(() => {
    if (items?.length > page * perPage) {
      return items.length - (page * perPage);
    }

    return 0;
  }, [page, items]);

  const handleClickShowMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      {items?.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant='h5' component='h1' color='text.primary'>
            Similar Products
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
