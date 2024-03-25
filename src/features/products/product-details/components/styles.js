import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  '& .active': {
    border: `1px solid ${theme.palette.primary.main} !important`
  },
  '& .active .check': {
    visibility: 'visible',
  },
}));

export const StyledCard = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  border: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingInlineStart: theme.spacing(2),
  paddingInlineEnd: theme.spacing(2),
}));

export const StyledSelected = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  width: 20,
  height: 20,
  borderTopLeftRadius: theme.spacing(1),
  borderBottomRightRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden'
}));
