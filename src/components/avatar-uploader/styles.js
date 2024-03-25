import { styled, alpha } from '@mui/material/styles';
import { Avatar, Box } from '@mui/material';

export const StyledUploaderArea = styled('div')(({ theme }) => ({
  width: 184,
  height: 184,
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  overflow: 'hidden',
  borderRadius: '50%',
  position: 'relative',
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`
}));

export const StyledDisplayUploader = styled(Box)(({ theme }) => ({
  lineHeight: 1,
  display: 'block',
  overflow: 'hidden',
  zIndex: 8,
  borderRadius: '50%',
  width: 'calc(100% - 16px)',
  height: 'calc(100% - 16px)',
  position: 'absolute',
  left: 8,
  right: 0,
}));

export const StyledImageWrapper = styled('span')(({ theme }) => ({
  display: 'inline-block',
  color: 'transparent',
  filter: 'blur(0)',
  transition: 'filter .3s, -webkit-filter .3s',
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  '&:hover': {
    opacity: 0.5
  }
}));

export const StyledBoxImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: '100%',
  height: '100%'
}));

export const StyledPlaceHolder = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: 'calc(100% - 16px)',
  height: 'calc(100% - 16px)',
  position: 'absolute',
  left: 8,
  right: 0,
  zIndex: 9,
  opacity: 0,
  transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  color: 'white',
  backgroundColor: alpha(theme.palette.grey[500], 0.64),
  '&:hover': {
    opacity: 0.72
  }
}));

