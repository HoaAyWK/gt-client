import React from 'react';

import { Page } from '../components';
import { ProductDetails } from '../features/products';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();

  return (
    <Page title='Product details'>
      <ProductDetails id={id} />
    </Page>
  );
};

export default ProductPage;
