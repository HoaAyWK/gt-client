import React from 'react';

import { Cover } from '../../../../components';

const SecondaryBanner = ({ image }) => {
  return (
    <Cover
      src={image}
      alt='image'
      sx={{
        height: 120,
        objectFit: 'cover',
        width: '100%',
        borderRadius: 1,
      }}
      loading='lazy'
    />
  );
};

export default SecondaryBanner;
