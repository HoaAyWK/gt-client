import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AdminPageLayout } from '../common';
import { UpdateProductVariantForm } from '../../../features/admin/product-variant';
// import { createProduct } from '../../../features/admin/product/productSlice';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Product Variant', path: '/admin/product-variants' },
  { label: 'Update' }
];

const UpdateProductVariantPage = () => {
  const { id } = useParams();
  // const { createProductStatus } = useSelector((state) => state.adminProducts);

  return (
    <AdminPageLayout
      pageTitle='Update product variant'
      pageHeaderName='Update product variant'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <UpdateProductVariantForm productVariantId={id} />
    </AdminPageLayout>
  );
};

export default UpdateProductVariantPage;
