import React, { useState, useEffect, useMemo } from 'react';
import { Grid, Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';

import PATHS from '../../constants/paths';
import { getOrders, getPendingOrders, selectAllOrders, selectOrdersByPage, selectPendingOrdersByPage } from './orderSlice';
import OrderTab from './OrderTab';
import { STATUS } from '../../constants/orderStatus';

const PER_PAGE_OPTIONS = [5, 10, 25];

const OrderTabs = () => {
  const defaultTab = STATUS.ALL;
  const defaultPage = 1;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get('tab');
  const [tab, setTab] = useState(currentTab ? currentTab : defaultTab);
  const [allOrdersPerPage, setAllOrdersPerPage] = useState(PER_PAGE_OPTIONS[0]);
  const [allOrdersPage, setAllOrdersPage] = useState(defaultPage);
  const [pendingOrdersPerPage, setPendingOrdersPerPage] = useState(PER_PAGE_OPTIONS[0]);
  const [pendingOrdersPage, setPendingOrdersPage] = useState(defaultPage);
  const dispatch = useDispatch();
  const orders = useSelector(state => selectOrdersByPage(state, allOrdersPage));
  const pendingOrders = useSelector(state => selectPendingOrdersByPage(state, pendingOrdersPage));
  const {
    getOrdersTotalPage,
    getPendingOrdersTotalPage,
    getOrdersPages,
    getPendingOrdersPages
  } = useSelector(state => state.orders);

  useEffect(() => {
    switch (tab) {
      case defaultTab:
        dispatch(getOrders({
          page: allOrdersPage,
          pageSize: allOrdersPerPage,
          status: defaultTab
        }));
        break;

      case STATUS.PENDING:
        dispatch(getPendingOrders({
          page: defaultPage,
          pageSize: PER_PAGE_OPTIONS[0]}));
        break;

      default:
        console.log('None supported tab.');
    }
  }, [tab]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);

    if (newValue === defaultTab) {
      navigate({ pathname: PATHS.USER_ORDERS });
    } else {
      navigate(`${PATHS.USER_ORDERS}?tab=` + newValue);
    }
  };

  const handleAllOrdersPerPageChange = (event) => {
    setAllOrdersPerPage(event.target.value);
    setAllOrdersPage(defaultPage);
    dispatch(getOrders({
      page: defaultPage,
      pageSize: event.target.value,
      status: defaultTab
    }))
  };

  const handleAllOrdersPageChange = (event, value) => {
    setAllOrdersPage(value);

    const isPreviousSelectedPage = getOrdersPages.indexOf(value) > -1;

    if (!isPreviousSelectedPage) {
      dispatch(getOrders({
        page: value,
        pageSize: allOrdersPerPage,
        status: defaultTab
      }));
    }
  };

  const handlePendingOrdersPerPageChange = (event) => {
    setPendingOrdersPerPage(event.target.value);
    setPendingOrdersPage(defaultPage);
    dispatch(getPendingOrders({
      page: defaultPage,
      pageSize: event.target.value
    }));
  };

  const handlePendingOrdersPageChange = (event, value) => {
    setPendingOrdersPage(value);

    const isPreviousSelectedPage = getPendingOrdersPages.indexOf(value) > -1;

    if (!isPreviousSelectedPage) {
      dispatch(getPendingOrders({
        page: value,
        pageSize: pendingOrdersPerPage
      }));
    }
  };

  return (
    <TabContext value={tab}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <TabList onChange={handleTabChange} aria-label='profile tabs'>
        {Object.keys(STATUS).map((key) => (
          <Tab label={STATUS[key]} key={STATUS[key]} value={STATUS[key]} />
        ))}
      </TabList>
      </Box>
        <TabPanel sx={{ px: 0 }} value={STATUS.ALL}>
          <OrderTab
            orders={orders}
            page={allOrdersPage}
            onPageChange={handleAllOrdersPageChange}
            perPage={allOrdersPerPage}
            onPerPageChange={handleAllOrdersPerPageChange}
            perPageOptions={PER_PAGE_OPTIONS}
            totalPage={getOrdersTotalPage}
          />
        </TabPanel>
        <TabPanel sx={{ px: 0 }} value={STATUS.PENDING}>
          <OrderTab
            orders={pendingOrders}
            page={pendingOrdersPage}
            onPageChange={handlePendingOrdersPageChange}
            perPage={pendingOrdersPerPage}
            onPerPageChange={handlePendingOrdersPerPageChange}
            perPageOptions={PER_PAGE_OPTIONS}
            totalPage={getPendingOrdersTotalPage}
          />
        </TabPanel>
    </TabContext>
  );
};

export default OrderTabs;
