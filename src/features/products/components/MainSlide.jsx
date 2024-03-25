import React from 'react';
import { Box } from '@mui/material';

import { Cover } from '../../../components';

const MainSlide = ({ image }) => {
  return (
    <Box>
      <Box
        component='span'
        sx={{
          width: '100%',
          lineHeight: 1,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          paddingTop: '100%',
          borderRadius: 1
        }}
      >
        <Box
          component='span'
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            display: 'inline-block',
            color: 'transparent'
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
            alt='Product Image'
            loading='lazy'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MainSlide;
