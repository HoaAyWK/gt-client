import React from 'react';

import { Page } from '../components';
import PasswordSettings from '../features/settings/PasswordSettings';

const PasswordSettingsPage = () => {
  return (
    <Page title='Change Password' sx={{ mt: 4 }}>
      <PasswordSettings />
    </Page>
  );
};

export default PasswordSettingsPage;
