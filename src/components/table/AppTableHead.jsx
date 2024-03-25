import React from 'react';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

const AppTableHead = (props) => {
  const { numSelected, onSelectAllClick, headLabels, rowCount } = props;

  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: (theme) => theme.palette.background.neutral
        }}
      >
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
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
  );
};

export default AppTableHead;
