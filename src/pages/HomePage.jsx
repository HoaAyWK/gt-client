import React from "react";
import { Box } from '@mui/material';

import { Page } from "../components";
import { Home } from '../features/home';

const HomePage = () => {
  return (
    <Page title="Home">
      <Box sx={{ py: 2 }}>
        <Home />
      </Box>
    </Page>
  );
};

export default HomePage;
