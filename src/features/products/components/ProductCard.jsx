import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, IconButton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import  { Iconify, Label } from  '../../../components';
import { ColorPreview } from '../../../components/color-utils';
// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius
}));


// ----------------------------------------------------------------------

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ProductCard({ item }) {
  const { name, cover, price, colors, priceSale } = item;

  return (
    <StyledCard>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <IconButton
          aria-label='favorite'
          sx={{
            zIndex: 9,
            top: 8,
            right: 8,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
        >
          <Iconify icon='mdi:cards-heart' width={24} height={24} />
        </IconButton>
        <Link component={RouterLink} to='/products/thinkpad'>
          <StyledProductImg alt={name} src={cover} />
        </Link>
      </Box>

      <Stack spacing={0.5} sx={{ px: 3, pt: 3 }}>
        {colors && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ColorPreview colors={colors} />
          </Box>
        )}

        <Link color="inherit" underline="hover" component={RouterLink} to='/products/thinkpad'>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">
              {fCurrency(price)}
              &nbsp;
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {priceSale && fCurrency(priceSale)}
              </Typography>
            </Typography>
          </Stack>
          <Label variant='outlined' color='error'>-10%</Label>
        </Box>
      </Stack>
      <Box
        sx={{ mt: 2, width: '100%', px: 3, pb: 2 }}
      >
        <Button variant='contained' color='primary' fullWidth>
          <Iconify icon='mdi:add-shopping-cart' width={24} height={24} />
          &nbsp;
          Add To Cart
        </Button>
      </Box>
    </StyledCard>
  );
}
