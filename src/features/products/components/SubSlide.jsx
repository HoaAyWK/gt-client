import React from 'react';
import { Box } from '@mui/material';

import { Cover } from '../../../components';

const SubSlide = ({ image }) => {

  return (
    <Box
      sx={{
        px: 1,
        display: 'block'
      }}
    >
      <Box
        component='span'
        sx={{
          lineHeight: 1,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          width: 84,
          height: 84,
          borderRadius: '12px',
          cursor: 'pointer',
        }}
      >
        <Box
          component='span'
          sx={{
            width: '100%',
            height: '100%',
            display: 'block',
            backgroundSize: 'cover'
          }}
        >
          <Cover
            component='img'
            sx={{
              width: '100%',
              height: '100%',
              display: 'inline-block',
              objectFit: 'cover'
            }}
            src={image}
            alt='thumbnail'
            loading='lazy'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SubSlide;
