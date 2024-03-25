import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  color: theme.palette.main,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  zIndex: 0,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(2),
  marginBottom: 15,
  marginTop: 5
}));

export default StyledPaper;
