import React from 'react';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography
} from '@mui/material';

import { Order } from './components';
import find from '../../assets/images/find.png';

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
      {orders.length > 0 ? (
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
      ) : (
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Stack spacing={2}>
            <Box
              component='img'
              alt='empty order'
              src={find}
              sx={{
                width: 154,
                height: 164,
                objectFit: 'cover',
              }}
            />
            <Typography variant='subtitle1' color='text.secondary' textAlign='center'>
              No orders yet
            </Typography>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default OrderTab
