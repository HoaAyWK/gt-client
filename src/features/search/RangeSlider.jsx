import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Divider, Slider, Typography, Grid, TextField } from '@mui/material';
import { useRange } from 'react-instantsearch-hooks-web';
import { Iconify } from '../../components';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  paddingBlock: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`
}));

const RangeSlider = (props) => {
  const { label } = props;
  const { start, range, refine } = useRange(props);

  console.log(start);
  console.log(range);

  const handleChange = (event, newValue) => {
    refine(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='subtitle2' color='text.secondary' textTransform='uppercase' sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={5.25}>
          <StyledBox>
            <Typography variant='caption' color='text.primary'>
              ${start[0]}
            </Typography>
          </StyledBox>
        </Grid>
        <Grid item xs={1.5}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Iconify icon='bi:dash-lg' width={12} height={12} />
          </Box>
        </Grid>
        <Grid item xs={5.25}>
          <StyledBox>
            <Typography variant='caption' color='text.primary'>
              ${start[1]}
            </Typography>
          </StyledBox>
        </Grid>
      </Grid>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={start}
        valueLabelDisplay='auto'
        onChange={handleChange}
        min={range.min}
        max={range.max}
      />
    </Box>
  );
};

export default RangeSlider;
