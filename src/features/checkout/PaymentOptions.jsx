import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Stack,
  Radio,
  RadioGroup,
  Paper,
  Typography
} from '@mui/material';

import { Iconify } from '../../components';
import vnpayIcon from '../../assets/icons/payments/ic_vnpay.svg';
import visaIcon from '../../assets/icons/payments/ic_visa.svg';
import mastercardIcon from '../../assets/icons/payments/ic_mastercard.svg';
import { PAYMENT_OPTIONS } from '../../constants/payment';

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alginItems: 'center',
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.grey[500_24]}`,
  borderRadius: theme.shape.borderRadius,
  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    width: '100%'
  }
}));

const Option = ({ value, name, description, logos }) => {
  return (
    <StyledPaper>
      <StyledFormControlLabel
        sx={{ width: '100%', p: 2, m: 0 }}
        value={value}
        control={
          <Radio
            sx={{ mr: 1 }}
            checkedIcon={<Iconify icon='eva:checkmark-circle-2-fill' width={24} height={24} />}
          />
        }
        label={
          <Box sx={{ display: 'flex', alginItems: 'center', jusitfyContent: 'space-between', width: '100%' }}>
            <Stack spacing={0.5}>
              <Typography variant='subtitle2'>
                {name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {description}
              </Typography>
            </Stack>
            <Box sx={{ flex: 1 }} />
            {logos && (
              <Box sx={{ display: 'flex', alignItems: 'center', pr: 2, 'justifyContent': 'flex-end' }}>
                {logos.map((logo, index) => (
                  <Box component='img' key={index} src={logo} alt='logo' sx={{ width: 36, height: 36, mr: 0.5 }} />
                ))}
              </Box>
            )}
          </Box>
        }
      />
    </StyledPaper>
  )
};

const PaymentOptions = ({ step, onBack, user, numSelected, onBackActiveStep, paymentOption, onSelectPaymentOption }) => {

  useEffect(() => {
    if (!user) {
      onBackActiveStep(0);
    }
  }, [user]);

  useEffect(() => {
    if (numSelected === 0) {
      onBackActiveStep(0);
    }
  }, [numSelected]);

  const handleValueChange = (event) => {
    onSelectPaymentOption(event.target.value);
  };


  return (
    <Box sx={{ display: step === 2 ? 'block' : 'none' }}>
      <Card>
        <CardContent>
          <Typography variant='h6' sx={{ mb: 4 }}>
            Payment Options
          </Typography>
          <FormControl sx={{ width: '100%' }}>
            <RadioGroup
              aria-label='payment options'
              name='payment-options-radio-group'
              value={paymentOption}
              onChange={handleValueChange}
            >
              <Stack spacing={3}>
                <Option
                  value={PAYMENT_OPTIONS.CREDIT}
                  name='Credit / Debit Card'
                  description='We support Mastercard, Visa, Discover and Stripe.'
                  logos={[mastercardIcon, visaIcon]}
                />
                <Option
                  value={PAYMENT_OPTIONS.CASH}
                  name='Cash on Checkout Delivery'
                  description='Pay with cash when your order is delivered.'
                />
              </Stack>
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      <Box sx={{ mt: 2 }}>
        <Button color='inherit' onClick={onBack}>
          <Iconify icon='material-symbols:arrow-back-ios-new' width={16} height={16} />
            &nbsp;
            Back
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentOptions;
