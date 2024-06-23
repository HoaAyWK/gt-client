import React, { useMemo, useState } from 'react';
import {
  Box,
  IconButton,
  Link,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import { Iconify, QuantityControl } from '../../../../components';
import { fCurrency } from '../../../../utils/formatNumber';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../../common/cartSlice';
import defaultProductImage from "../../../../assets/images/default_product_image.png";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  'td, th': {
    border: 0
  }
}));

const LineItem = ({ cartId, item }) => {
  const dispatch = useDispatch();
  const {
    id,
    productId,
    productName,
    productVariantId,
    productAttributes,
    productImageUrl,
    basePrice,
    finalPrice,
    subTotal,
    quantity,
    discount
  } = item;

  const [itemQuantity, setItemQuantity] = useState(quantity);

  const hasDiscount = useMemo(() => {
    if (discount) {
      return true;
    }

    return false;
  }, [discount]);

  const productUrl = useMemo(() => {
    if (!productVariantId) {
      return `/products/${productId}`;
    }

    return `/products/${productId}/variants/${productVariantId}`;
  }, [productId, productVariantId]);

  const handleIncreaseQuantity = () => {
    setItemQuantity(prev => prev + 1);
    dispatch(addToCart({ productId, productVariantId, quantity: 1 }));
  };

  const handleDecreaseQuantity = () => {
    setItemQuantity(prev => prev - 1);
    dispatch(addToCart({ productId, productVariantId, quantity: -1 }));
  };

  const handleClickDelete = () => {
    dispatch(removeFromCart({ cartId, id }));
  };

  return (
    <StyledTableRow>
      <TableCell component='th' scope='row' sx={{ minWidth: 300 }}>
        <Link component={RouterLink} to={productUrl} underline='hover' >
          <Stack direction='row' spacing={2} alignItems='center'>
            <Box
              component='img'
              src={productImageUrl ?? defaultProductImage}
              alt={productName}
              sx={{
                width: 56,
                height: 56,
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
            <Stack spacing={0.5}>
              <Typography variant='subtitle2' color='text.primary'>
                {productName}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {productAttributes}
              </Typography>
            </Stack>
          </Stack>
        </Link>
      </TableCell>

      <TableCell align='center'>
          <Typography variant='body2'>
            {hasDiscount && (
              <>
                <s>{fCurrency(basePrice)}</s>
                &nbsp;
              </>
            )}
            {fCurrency(finalPrice)}
          </Typography></TableCell>
      <TableCell align='right'>
        <QuantityControl
          quantity={itemQuantity}
          increaseQuantity={handleIncreaseQuantity}
          decreaseQuantity={handleDecreaseQuantity}
          max={10}
        />
      </TableCell>
      <TableCell align='center'>{fCurrency(subTotal)}</TableCell>

      <TableCell align='right'>
        <Tooltip title='Delete'>
          <IconButton onClick={handleClickDelete}>
            <Iconify icon='eva:trash-2-outline' width={24} height={24} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </StyledTableRow>
  );
};

export default LineItem;
