import React from 'react';
import { useParams } from 'react-router-dom';

import { Page } from '../components';
import OrderDetails from '../features/orders/order-details';

const OrderDetailsPage = () => {
  const { id } = useParams();

  return (
    <Page title='Order details' sx={{ mt: 4 }}>
      <OrderDetails id={id} />
    </Page>
  );
};

export default OrderDetailsPage;
