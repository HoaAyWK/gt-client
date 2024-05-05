import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Divider, Stack, Pagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';

import { ORDER_STATUS, STATUS } from '../../../constants/orderStatus';
import { Order } from './components';
import { Page } from '../../../components';
import ACTION_STATUS from '../../../constants/actionStatus';
import { Navigate } from 'react-router-dom';

const StyledBox = styled(Box)(({ theme }) => ({
  '& .slick-slide': {
    width: 'auto !important'
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none'
}));

const ProfileOrders = () => {
  const dispatch = useDispatch();
  const [nav, setNav] = useState(null);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState(STATUS.ALL);
  const orders = useSelector(selectAllBills);
  const { getMyBillsStatus, totalMyBillsPage } = useSelector((state) => state.orders);

  useEffect(() => {
    if (getMyBillsStatus === ACTION_STATUS.IDLE) {
      dispatch(getMyBills({ page, status: filterStatus }));
    }
  }, []);

  useEffect(() => {
    dispatch(getMyBills({ page, status: filterStatus }));
  }, [page, filterStatus]);

  const navSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    swipeToSlide: true,
    arrows: false,
    centerPadding: '20px',
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3
        }
      },
    ]
  };

  const handleClick = (value) => () => {
    setFilterStatus(value);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  if (getMyBillsStatus === ACTION_STATUS.IDLE ||
      getMyBillsStatus === ACTION_STATUS.LOADING) {
    return (
      <Box
        sx={{
          width: '100%',
          py: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (getMyBillsStatus === ACTION_STATUS.FAILED) {
    return <Navigate to='/profile?tab=overview' />;
  }

  return (
    <Page title='My Orders'>
      <StyledBox>
        <Slider {...navSettings} ref={slider => setNav(slider)}>
          {ORDER_STATUS.map((status) => (
            <Box sx={{ mr: 2 }} key={status}>
              <StyledButton
                size='small'
                disableElevation
                variant={filterStatus === status ? 'contained' : 'text'}
                color={filterStatus === status ? 'primary' : 'inherit' }
                onClick={handleClick(status)}
              >
                {status}
              </StyledButton>
            </Box>
          ))}
        </Slider>
      </StyledBox>
      <Stack spacing={3} sx={{ mt: 6 }}>
        {orders.map((order, index) => (
          <Box key={order.id} sx={{ width: '100%' }}>
            <Order key={order.id} order={order} />
            {index < orders.length - 1 && (
              <Divider sx={{ mt: 4, mb: 2 }} />
            )}
          </Box>
        ))}
      </Stack>
      {totalMyBillsPage > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          <Pagination count={totalMyBillsPage} color='primary' onChange={handlePageChange} page={page} />
        </Box>
      )}
    </Page>
  );
};

export default ProfileOrders;
