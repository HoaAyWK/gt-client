import React from 'react';
import { Box, Skeleton } from '@mui/material';
import cx from 'classnames';

import { useImage } from '../../hooks';

const Cover = ({ src, alt, sx, ...other }) => {
  const { loaded } = useImage({ src });

  if (!loaded) {
    return <Skeleton sx={{...sx}} variant='rounded' />
  }

  return (
    <Box
      component='img'
      alt={alt}
      src={src}
      className={cx("smooth", { loaded })}
      sx={{...sx}}
      {...other}
    />
  );
};

export default Cover;
