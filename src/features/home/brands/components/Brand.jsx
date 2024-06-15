import React, { useMemo } from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';

import emptyImage from '../../../../assets/images/default_product_image.png';

const Brand = ({ brand }) => {
  const { name, imageUrl } = brand;
  const image = useMemo(() => {
    if (imageUrl) {
      return imageUrl;
    }
    return emptyImage;
  });

  return (
    <Card sx={{ borderRadius: theme => theme.spacing(1) }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: 'center',
            justifyContent: "center",
            width: '100%',
            minHeight: 200
          }}
        >
          <Box
            component="img"
            src={image}
            alt={name}
            sx={{
              width: 200,
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Typography variant="h6" component='h3' align="center" mt={2}>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Brand;
