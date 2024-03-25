import React from 'react';
import { useParams } from 'react-router-dom';

import { AdminPageLayout } from '../common';
import { OrderDetails } from '../../../features/admin/order';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Order', path: '/admin/orders' },
  { label: 'Order Details' },
];

const OrderDetailsPage = () => {
  const { id } = useParams();

  return (
    <AdminPageLayout
      pageHeaderName='Order details'
      pageTitle='Order Details'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <OrderDetails id={id} />
    </AdminPageLayout>
  );
};

export default OrderDetailsPage;
