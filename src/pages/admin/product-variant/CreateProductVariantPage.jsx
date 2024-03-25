import React from 'react';
import { useSelector } from 'react-redux';

import { AdminPageLayout } from '../common';
import { CreateProductVariantForm } from '../../../features/admin/product-variant';
// import { createProduct } from '../../../features/admin/product/productSlice';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Product Variant', path: '/admin/product-variants' },
  { label: 'Create' }
];

const CreateProductVariantPage = () => {
  // const { createProductStatus } = useSelector((state) => state.adminProducts);

  return (
    <AdminPageLayout
      pageTitle='Create a new product variant'
      pageHeaderName='Create product variant'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <CreateProductVariantForm />
    </AdminPageLayout>
  );
};

export default CreateProductVariantPage;
