import React from 'react';
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
  { id: 'name', label: 'Product', align: 'left' },
  { id: 'price', label: 'Unit Price', align: 'center' },
  { id: 'quantity', label: 'Quantity', align: 'center' },
  { id: 'total', label: 'Total', align: 'center' },
  { id: 'action', label: '', align: 'left' },
];

const Cart = ({ step, cart }) => {
  const dispatch = useDispatch();
  const handleClick = (e, productId, data) => {
    dispatch(checkItem(data));
  };

  return (
    <Box sx={{ display: step === 0 ? 'block' : 'none' }}>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 500 }}>
            <Table>
              <AppTableHead
                headLabels={TABLE_HEAD}
              />
              <TableBody>
                {cart.items.map((item) => {
                  const key = item.productVariantId ? item.productVariantId : item.productId;
                  return (
                    <LineItem
                      key={key}
                      item={item}
                      handleClick={handleClick}
                      cartId={cart.id}
                    />
                )})}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        {!cart.items.length > 0 && (
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
