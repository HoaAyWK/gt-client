import React from 'react';
import { styled } from '@mui/material/styles';
import { OutlinedInput, InputAdornment } from '@mui/material';

import { Iconify } from '../../../components';

const StyledSearchInput = styled(OutlinedInput)(({ theme }) => ({
  width: '100%',
  borderRadius: '4px',
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
  '&.MuiInputBase-input.MuiOutlinedInput-input': {
    paddingTop: 8,
    paddingBottom: 8
  }
}));

const SearchBox = ({ filter, onFilter, title }) => {
  return (
    <StyledSearchInput
      value={filter}
      onChange={onFilter}
      placeholder={`Fitler ${title}`}
      startAdornment={
        <InputAdornment position='start'>
          <Iconify icon='eva:search-fill' width={20} heigh={20} sx={{ color: 'text.disabled '}} />
        </InputAdornment>
      }
    />
  );
};

export default SearchBox;
