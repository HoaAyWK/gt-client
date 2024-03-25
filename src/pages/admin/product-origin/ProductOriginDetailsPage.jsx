import React from 'react';
import { useParams } from 'react-router-dom';

import { AdminPageLayout } from '../common';
import { ProductOriginDetails } from '../../../features/admin/product-origin';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Product Origin', path: '/admin/product-origins' },
  { label: 'Details' },
];

const ProductOriginDetailsPage = () => {
  const { id } = useParams();

  return (
    <AdminPageLayout
      pageTitle='Product origin details'
      pageHeaderName='Product origin details'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <ProductOriginDetails id={id} />
    </AdminPageLayout>
  );
};

export default ProductOriginDetailsPage;
