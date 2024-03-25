import React from 'react';

import { AdminPageLayout } from '../common';
import { CreateProductOriginForm } from '../../../features/admin/product-origin';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Product Origin', path: '/admin/product-origins' },
  { label: 'Create' }
];

const CreateProductPage = () => {
  return (
    <AdminPageLayout
      pageTitle='Create a new product origin'
      pageHeaderName='Create product origin'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <CreateProductOriginForm />
    </AdminPageLayout>
  );
};

export default CreateProductPage;
