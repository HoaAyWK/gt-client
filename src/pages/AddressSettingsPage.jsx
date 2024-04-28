import React from 'react';

import { Page } from '../components';
import AddressSettings from '../features/settings/address-settings';

const AddressSettingsPage = () => {
  return (
    <Page title='My Addresses' sx={{ mt: 4 }}>
      <AddressSettings />
    </Page>
  );
};

export default AddressSettingsPage;
