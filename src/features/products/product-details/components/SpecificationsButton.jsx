import React from 'react';
import { Stack, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { Iconify } from '../../../../components';
import { StyledBox, StyledCard, StyledSelected } from './styles';

const SpecificationsButton = ({ attributeId, attributeValue, select }) => {
  return (
    <StyledBox >
      <StyledCard className={select ? 'active' : ''}>
        <StyledSelected className='check'>
          <Iconify icon='material-symbols:check' width={16} height={16} />
        </StyledSelected>
        <Stack spacing={0.5}>
          <Typography variant='body2' color='text.primary' textAlign='center'>
            {attributeValue.name}
          </Typography>
        </Stack>
      </StyledCard>
    </StyledBox>
  );
};

export default SpecificationsButton;
