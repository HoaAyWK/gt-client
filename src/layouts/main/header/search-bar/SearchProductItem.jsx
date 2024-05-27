import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { fCurrency } from '../../../../utils/formatNumber';

const SearchedProductItem = (props) => {
  const { item, components, navigate } = props;
  const realPrice = useMemo(() => {
    return item.price;
  }, [item]);

  const itemUrl = useMemo(() => {
    let url = `/products/${item.productId}`;

    if (item.productId !== item.objectID) {
      url = `/products/${item.productId}/variants/${item.objectID}`;
    }

    return url;
  }, [item]);

  const handleClick = (e) => {
    e.preventDefault();
    navigate(itemUrl);
  };

  return (
    <a href={itemUrl} onClick={handleClick} className='aa-ItemLink'>
      <Box className='aa-ItemContent' sx={{ display: 'flex' }}>
        <div className='aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop'>
          <Box
            component='img'
            alt={item.name}
            src={item.image}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          </div>
          <Box className='aa-ItemContentBody' sx={{ p: 1 }}>
            <div className='aa-ItemContentTitle'>
              <components.Snippet hit={item} attribute='name' />
            </div>
            <div className='aa-ItemContentDescription'>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant='subtitle1' fontWeight='bold' component='p' color='error'>
                  {fCurrency(realPrice)}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  &nbsp;
                  <s>{fCurrency(item.price)}</s>
                </Typography>
              </Box>
            </div>
          </Box>
      </Box>
    </a>
  );
};

export default SearchedProductItem;
