import React, { useState } from 'react';
import { Box } from '@mui/material';
import CredentialsStepForm from './CredentialsStepForm';
import InfoStepForm from './InfoStepForm';

const MultiStepsRegisterForm = ({ submit, status }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const storeData = (data) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <Box
      sx={{ width: '100%' }}
    >
      <Box sx={{ mt: 4 }}>
        <CredentialsStepForm
          storeData={storeData}
          handleNext={handleNext}
          visible={activeStep === 0}
        />
        <InfoStepForm
          storedData={formData}
          handleBack={handleBack}
          visible={activeStep === 1}
          submit={submit}
          status={status}
        />
      </Box>
    </Box>
  );
};

export default MultiStepsRegisterForm;
