import React, { useMemo, useState } from 'react';
import {
  Box,
  Checkbox,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { Iconify, QuantityControl } from '../../../../components';
import { fCurrency } from '../../../../utils/formatNumber';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../../common/cartSlice';
import { TYPES } from '../../../../constants/cart';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  'td, th': {
    border: 0
  }
}));

const LineItem = ({ cartId, item, handleClick }) => {
  const dispatch = useDispatch();
  const { productId, productName, price, quantity, discount, images, status, warehouse } = item;
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const realPrice = useMemo(() => {
    return price - price * (discount / 100);
  }, [price, discount]);

  const handleIncreaseQuantity = () => {
    setItemQuantity(prev => prev + 1);
    dispatch(addToCart({ productId, quantity: 1, type: TYPES.ADD }));
  };

  const handleDecreaseQuantity = () => {
    setItemQuantity(prev => prev - 1);
    dispatch(addToCart({ productId, quantity: -1, type: TYPES.SUB }));
  };

  const handleClickDelele = () => {
    dispatch(removeFromCart({ cartId, productId }));
  };

  return (
    <StyledTableRow tabIndex={-1} role='checkbox' selected={status}>
      <TableCell padding='checkbox'>
        <Checkbox
          checked={status}
          onChange={(e) => handleClick(e, productName, { cartId, productId, checked: !status })}
        />
      </TableCell>

      <TableCell component='th' scope='row' padding='none'>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Box
            component='img'
            src={images[0]}
            alt={productName}
            sx={{
              width: 56,
              height: 56,
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
          <Typography variant='subtitle2'>
            {productName}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align='right'>{fCurrency(realPrice)}</TableCell>
      <TableCell align='right'>
        <QuantityControl
          quantity={itemQuantity}
          increaseQuantity={handleIncreaseQuantity}
          decreaseQuantity={handleDecreaseQuantity}
          max={warehouse}
        />
      </TableCell>
      <TableCell align='right'>{fCurrency(realPrice * itemQuantity)}</TableCell>

      <TableCell align='right'>
        <Tooltip title='Delete'>
          <IconButton onClick={handleClickDelele}>
            <Iconify icon='eva:trash-2-outline' width={24} height={24} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </StyledTableRow>
  );
};

export default LineItem;
