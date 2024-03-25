import React from 'react';
import { useParams } from 'react-router-dom';

import { Page } from '../components';
import OrderDetails from '../features/order-details';

const OrderDetailsPage = () => {
  const { id } = useParams();

  return (
    <Page title='Order details'>
        <OrderDetails id={id} />
    </Page>
  );
};

export default OrderDetailsPage;
