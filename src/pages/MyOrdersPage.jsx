import React from 'react';

import { Page } from '../components';
import OrderTabs from '../features/orders';

const MyOrdersPage = () => {
  return (
    <Page title='My Orders' sx={{ mt: 4 }}>
      <OrderTabs />
    </Page>
  );
};

export default MyOrdersPage;
