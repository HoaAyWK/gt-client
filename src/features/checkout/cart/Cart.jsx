import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Link,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LineItem } from './components';
import { Iconify } from '../../../components';
import Scrollbar from '../../../components/scrollbar';
import { AppTableHead, AppTableToolbar } from '../../../components/table';
import { checkAll, checkItem, removeMultiItems } from '../../common/cartSlice';
import emptyCart from '../../../assets/images/empty_cart.png';

const TABLE_HEAD = [
  { id: 'name', label: 'Product', alignRight: false },
  { id: 'price', label: 'Price', alignRight: true },
  { id: 'quantity', label: 'Quantity', alignRight: true },
  { id: 'total', label: 'Total', alignRight: true },
  { id: 'action', label: '', alignRight: false },
];

const Cart = ({ step, cart, numSelected }) => {
  const dispatch = useDispatch();
  const selectedItems = useMemo(() => {
    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      return 0;
    }

    return cart.cartItems.filter((item) => item.status);
  }, [cart]);

  const handleSelectAllClick = (e) => {

    if (e.target.checked) {
      dispatch(checkAll({ cartId: cart.id, checked: e.target.checked }));
      return;
    }

    dispatch(checkAll({ cartId: cart.id, checked: false }));
  };

  const handleClick = (e, productId, data) => {
    dispatch(checkItem(data));
  };

  const handleClickDeleteAll = () => {
    const productIds = selectedItems.map((item) => item.productId);

    dispatch(removeMultiItems({ cartId: cart.id, productIds }));
  };

  return (
    <Box sx={{ display: step === 0 ? 'block' : 'none' }}>
      <Card>
        <AppTableToolbar numSelected={numSelected} handleClickDelete={handleClickDeleteAll} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 500 }}>
            <Table>
              <AppTableHead
                headLabels={TABLE_HEAD}
                rowCount={cart?.cartItems?.length}
                numSelected={numSelected}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {cart?.cartItems?.map((item) => (
                  <LineItem
                    key={item.productId}
                    item={item}
                    handleClick={handleClick}
                    cartId={cart.id}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        {!cart.cartItems?.length > 0 && (
          <Box
            sx={{
              width: '100%',
              height: 240,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 2
            }}
          >
            <Stack spacing={1}>
              <Box
                component='img'
                alt='empty cart'
                src={emptyCart}
                sx={{
                  width: 144,
                  height: 144,
                  objectFit: 'cover',
                }}
              />
              <Typography variant='subtitle1' color='text.secondary' textAlign='center'>
                Your cart is empty.
              </Typography>
            </Stack>
          </Box>
        )}
      </Card>
      <Box sx={{ mt: 4 }}>
        <Link component={RouterLink} to='/' underline='none' color='inherit'>
          <Button color='inherit'>
            <Iconify icon='material-symbols:arrow-back-ios-new' width={16} height={16} />
            &nbsp;
            Continue shopping
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Cart;
