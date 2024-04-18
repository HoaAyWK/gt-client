import React from 'react';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

const AppTableHead = (props) => {
  const {  headLabels } = props;

  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: (theme) => theme.palette.background.neutral
        }}
      >
        {headLabels.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default AppTableHead;
