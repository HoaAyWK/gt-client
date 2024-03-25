import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import algoliaSearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-hooks-web';

import Header from './header/Header';
import Footer from './footer';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '../../hooks';
import ACTION_STATUS from '../../constants/actionStatus';
import { getCurrentUserInfo } from '../../features/auth/authSlice';
import { Loading } from '../../components';

const APP_ID = import.meta.env.VITE_ALGOLIA_APP_ID;
const API_KEY = import.meta.env.VITE_ALGOLIA_API_KEY;
const indexName = import.meta.env.VITE_ALGOLIA_INDEX;

// const APP_ID = window._env_.VITE_ALGOLIA_APP_ID;
// const API_KEY = window._env_.VITE_ALGOLIA_API_KEY;
// const indexName = window._env_.VITE_ALGOLIA_INDEX;

const searchClient = algoliaSearch(APP_ID, API_KEY);

const RootStyle = styled('div')({
    minHeight: '100%',
    overflow: 'hidden',
    position: 'relative',
});

const searchRouting = {
  stateMapping: {
    stateToRoute(uiState) {
      const indexUiState = uiState[indexName];
      return {
        q: indexUiState.query,
        categories: indexUiState?.refinementList?.categories,
        brands: indexUiState?.refinementList?.brand,
        models: indexUiState?.refinementList?.model,
        specifications: indexUiState?.refinementList?.specifications,
        colors: indexUiState?.refinementList?.color,
        page: indexUiState.page,
        tab: indexUiState.tab
      };
    },
    routeToState(routeState) {
      return {
        [indexName]: {
          query: routeState.q,
          refinementList: {
            categories: routeState.categories,
            brand: routeState.brands,
            model: routeState.models,
            specifications: routeState.specifications,
            color: routeState.colors,
          },
          page: routeState.page,
          tab: routeState.tab
        }
      }
    }
  }
};

export default function Layout() {
  const { user, getCurrentUserStatus } = useSelector((state) => state.auth);
  const [accessToken] = useLocalStorage('accessToken', null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
      dispatch(getCurrentUserInfo());
    }
  }, []);

  useEffect(() => {
    if (user) {
      window.aa('setUserToken', user.id);
    }
  }, [user]);

  return (
    <>
      <RootStyle>
        <InstantSearch
          searchClient={searchClient}
          indexName={indexName}
          routing={searchRouting}
          insights={{ useCookie: true }}
        >
          <Configure clickAnalytics />
          <Header user={user} />
          <Container maxWidth='lg' sx={{ mt: 8, mb: 20 }}>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </Container>
        </InstantSearch>
        <Footer />
      </RootStyle>
    </>
  );
}
