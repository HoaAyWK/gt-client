import React from 'react';
import { Grid } from '@mui/material';

import { ProductCard } from './components';

const ProductList = () => {
  const products = [
    {
      id: 1,
      name: 'Lenovo Thinkpad E490',
      cover: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
      price: '25.99',
      priceSale: '29.99',
      status: 'avaialbe',
      colors: ['#000000', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', ],
      rating: 4.5
    },
    {
      id: 2,
      name: 'Lenovo Thinkpad E490',
      cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
      price: '25.99',
      priceSale: '29.99',
      status: 'avaialbe',
      colors: ['#00AB55', '#FFFFFF', '#FFC107'],
      rating: 3.6
    },
    {
      id: 3,
      name: 'Lenovo Thinkpad E490',
      cover: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      price: '25.99',
      priceSale: '29.99',
      status: 'avaialbe',
      colors: ['#FF4842', '#94D82D'],
      rating: 4.2
    },
    {
      id: 4,
      name: 'Lenovo Thinkpad E490',
      cover: 'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80',
      price: '25.99',
      priceSale: '29.99',
      status: 'avaialbe',
      colors: ['#94D82D'],
      rating: 4.0
    },
    {
      id: 5,
      name: 'Lenovo Thinkpad E490',
      cover: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      price: '25.99',
      priceSale: '29.99',
      status: 'avaialbe',
      colors: ['#94D82D', '#FFC0CB'],
      rating: 4.2
    },
    {
      id: 6,
      name: 'Lenovo Thinkpad E490',
      cover: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
      price: '25.99',
      priceSale: '29.99',
      status: 'avaialbe',
      colors: ['#FF4842', '#1890FF', '#94D82D', '#FFC0CB'],
      rating: 3.2
    }
  ];

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard item={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
