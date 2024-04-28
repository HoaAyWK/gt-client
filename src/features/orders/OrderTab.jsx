import React from 'react';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack
} from '@mui/material';

import { Order } from './components';

const OrderTab = (props) => {
  const {
    orders,
    page,
    onPageChange,
    perPageOptions,
    perPage,
    onPerPageChange,
    totalPage
  } = props;

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={4}>
          <FormControl variant='outlined' sx={{ minWidth: 120 }}>
            <InputLabel id='all-orders-per-page'>Rows per page</InputLabel>
            <Select
              labelId='all-orders-per-page'
              label='Rows per page'
              value={perPage}
              onChange={onPerPageChange}
              size='small'
            >
              {perPageOptions.map(value => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={7}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
            <Pagination
              count={totalPage}
              color='primary'
              variant='outlined'
              shape='rounded'
              siblingCount={0}
              boundaryCount={2}
              page={page}
              onChange={onPageChange}
            />
          </Box>
        </Grid>
      </Grid>
      <Stack spacing={2}>
        {orders.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </Stack>
    </>
  );
};

export default OrderTab
