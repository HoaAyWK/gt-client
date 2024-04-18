import React, { useEffect, useState } from 'react';
import { Grid, Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';

import { AccountCard, ProfileOverview, ProfileOrders, ProfileFavorites } from '../features/profile';
import { PROFILE_TABS } from '../constants/tabs';

const myAccount = {
  firstName: 'Sioay',
  lastName: 'Here',
  email: 'sioay@gmail.com',
  phone: '012939218',
  gender: 'male',
  dateOfBirth: '01/04/2000',
  address: '1 Vo Van Ngan, Thu Duc, Ho Chi Minh, Vietnam'
};


const TABS = [
  { value: PROFILE_TABS.OVERVIEW, label: 'Overview' },
  { value: PROFILE_TABS.ORDERS, label: 'Orders' },
  { value: PROFILE_TABS.FAVORITES, label: 'Favorites' }
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get('tab');
  const [tab, setTab] = useState(currentTab ? currentTab : PROFILE_TABS.OVERVIEW);

  useEffect(() => {
    if (currentTab) {
      setTab(currentTab);
    } else {
      setTab(PROFILE_TABS.OVERVIEW);
    }
  }, [currentTab]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);

    if (newValue === PROFILE_TABS.OVERVIEW) {
      navigate({ pathname: '/profile' });
    } else {
      navigate('/profile?tab=' + newValue);
    }
  };

  return (
    <Grid container spacing={2} sx={{ mt: 12 }}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AccountCard account={myAccount} />
      </Grid>
      <Grid item xs={12} sm={6} md={8} lg={9}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label='profile tabs'>
              {TABS.map((tab) => (
                <Tab label={tab.label} key={tab.value} value={tab.value} />
              ))}
            </TabList>
          </Box>
          <TabPanel sx={{ px: 0 }} value={PROFILE_TABS.OVERVIEW}>
            <ProfileOverview
              phone={myAccount.phone}
              dateOfBirth={myAccount.dateOfBirth}
              address={myAccount.address}
            />
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value={PROFILE_TABS.ORDERS}>
            <ProfileOrders />
          </TabPanel>
          <TabPanel sx={{ px: 0 }} value={PROFILE_TABS.FAVORITES}>
            <ProfileFavorites />
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
