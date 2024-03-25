import React from 'react';
import { Table, TableContainer, TableCell, TableHead, TableRow, TableBody } from '@mui/material';

import LineItem from './LineItem';

const headLabels = [
  { id: 'order', label: '#', alignRight: false },
  { id: 'product', label: 'Product', alignRight: false },
  { id: 'quantity', label: 'Quantity', alignRight: true },
  { id: 'price', label: 'Price', alignRight: true },
  { id: 'total', label: 'Total', alignRight: true },
];

const lineItems = [
  {
    id: 1,
    name: 'Arizona Soft Footbed Sandal',
    price: 29.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
  },
  {
    id: 3,
    name: 'Bitis Hunter',
    price: 35.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
  },
  {
    id: 2,
    name: 'Zoom Freak 2',
    price: 12.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1168&q=80'
  },
];

const LineItemTable = ({ items, status, orderUser }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headLabels.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.alignRight ? 'right' : 'left'}
            >
              {headCell.label}
            </TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <LineItem key={item.id} item={item} index={index} status={status} orderUser={orderUser} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LineItemTable;
