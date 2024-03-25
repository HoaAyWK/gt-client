import React from 'react';

import { AdminPageLayout } from '../common';
import { ProductVariantDetails } from '../../../features/admin/product-variant';
import { useParams } from 'react-router-dom';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Product Variant', path: '/admin/product-variants' },
  { label: 'Details' },
];

const ProductVariantDetailsPage = () => {
  const { id } = useParams();

  return (
    <AdminPageLayout
      pageTitle='Product variant details'
      pageHeaderName='Product variant details'
      breadcrumbs={breadcrumbs}
      showCreateButton={true}
      createName='Product Variant'
      createPath='/admin/product-variants/create'
    >
      <ProductVariantDetails productVariantId={id} />
    </AdminPageLayout>
  );
};

export default ProductVariantDetailsPage;
