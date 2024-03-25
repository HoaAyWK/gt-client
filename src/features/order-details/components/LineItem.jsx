import React, { useMemo, useState } from 'react';
import { TableRow, TableCell, Stack, Box, Typography, IconButton, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';

import { fCurrency } from '../../../utils/formatNumber';
import { Iconify } from '../../../components';
import { ProductReviewDialog } from '../../common/product-reviews';
import { STATUS } from '../../../constants/orderStatus';
import ROLES from '../../../constants/userRoles';

const LineItem = ({ item, index, status, orderUser }) => {
  const { productName, image, quantity, productPrice, reviewed, id } = item;
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const canReview = useMemo(() => {
    if (!reviewed &&
      status !== STATUS.CANCELLED &&
      status !== STATUS.PROCESSING &&
      user.id === orderUser &&
      user.role !== ROLES.ADMIN) {
        return true;
    }

    return false;
  }, [reviewed, status, user]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <TableRow>
      <TableCell>
        {index + 1}
      </TableCell>
      <TableCell component='th' scope='row' padding='none'>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Box
            component='img'
            src={image}
            alt={productName}
            sx={{
              width: 56,
              height: 56,
              objectFit: 'cover',
              borderRadius: 1,
              my: 1
            }}
          />
          <Stack spacing={1} direction='row' alignItems='center'>
            <Typography variant='subtitle2'>
              {productName}
            </Typography>
            {canReview && (
              <Tooltip title='Click to review the product.' onClick={handleOpenDialog}>
                <IconButton size='small' color='warning'>
                  <Iconify icon='material-symbols:release-alert-rounded' width={20} height={20} />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Stack>
        <ProductReviewDialog
          dialogTitle={`Write review for '${productName}'`}
          open={openDialog}
          handleClose={handleCloseDialog}
          orderId={id}
        />
      </TableCell>

      <TableCell align='right'>
        {quantity}
      </TableCell>
      <TableCell align='right'>{fCurrency(productPrice)}</TableCell>
      <TableCell align='right'>{fCurrency(productPrice * quantity)}</TableCell>
    </TableRow>
  );
};

export default LineItem;
