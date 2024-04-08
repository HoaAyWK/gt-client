import { styled } from '@mui/material/styles';
import { Avatar, Paper } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  color: theme.palette.main,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  zIndex: 0,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  backgroundColor: 'transparent',
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginInline: 'auto',
  [theme.breakpoints.up('xs')]: {
    width: 67,
    height: 67
  },
  [theme.breakpoints.up('md')]: {
    width: 100,
    height: 100
  }
}));
