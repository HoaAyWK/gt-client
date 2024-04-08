import React, { useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { Iconify } from '../../../../components';
import { StyledBox, StyledCard, StyledSelected } from './styles';

const AttributeValueButton = (props) => {
  const { attribute, attributeValue, selectedAttributes, onSelectAttributeValue } = props;

  const selected = useMemo(() => {
    return selectedAttributes[attribute.id] === attributeValue.id;
  }, [selectedAttributes, attribute]);

  const handleAttributeValueClick = () => {
    if (attributeValue.selectable) {
      onSelectAttributeValue(attributeValue, attribute.id);
    }
  };

  return (
    <StyledBox onClick={handleAttributeValueClick} >
      <StyledCard
        className={selected ? 'active' : ''}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: attributeValue.selectable ? 'pointer' : 'not-allowed'
        }}
      >
        <StyledSelected className='check'>
          <Iconify icon='material-symbols:check' width={16} height={16} />
        </StyledSelected>
        <Stack spacing={1} direction='row' sx={{ alignItems: 'center' }}>
          {attribute.colorable && (
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: attributeValue.color,
                boxShadow: theme => theme.shadows[2]
              }}
            />
          )}
          <Typography variant='body2' color='text.primary' textAlign='center'>
            {attributeValue.name}
          </Typography>
        </Stack>
      </StyledCard>
    </StyledBox>
  );
};

export default AttributeValueButton;
