import React from 'react';
import { useSelector } from 'react-redux';

import { AdminPageLayout } from '../common';
import { ProductForm } from '../../../features/admin/product';
import { createProduct } from '../../../features/admin/product/productSlice';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Product', path: '/admin/product' },
  { label: 'Create' }
];

const CreateProductPage = () => {
  const { createProductStatus } = useSelector((state) => state.adminProducts);

  return (
    <AdminPageLayout
      pageTitle='Create a new product'
      pageHeaderName='Create product'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <ProductForm isEdit={false} action={createProduct} status={createProductStatus} />
    </AdminPageLayout>
  );
};

export default CreateProductPage;
