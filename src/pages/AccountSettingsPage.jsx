import React from 'react';

import { Page } from '../components';
import AccountSettings from '../features/settings/account-settings';

const AccountSettingsPage = () => {
  return (
    <Page title='My Profile' sx={{ mt: 4 }}>
      <AccountSettings />
    </Page>
  );
};

export default AccountSettingsPage;
