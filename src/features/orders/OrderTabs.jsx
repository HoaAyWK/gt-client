import React, { useState, useEffect } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';

import PATHS from '../../constants/paths';
import {
  getOrders,
  getPendingOrders,
  getProcessingOrders,
  getCancelledOrders,
  getRefundedOrders,
  selectOrdersByPage,
  selectPendingOrdersByPage,
  selectProcessingOrdersByPage,
  selectCancelledOrdersByPage,
  selectRefundedOrdersByPage,
  resetGetOrders,
  resetGetPendingOrders,
} from './orderSlice';
import OrderTab from './OrderTab';
import { STATUS } from '../../constants/orderStatus';
import ACTION_STATUS from '../../constants/actionStatus';

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
  const [processingOrdersPage, setProcessingOrdersPage] = useState(defaultPage);
  const [processingOrdersPerPage, setProcessingOrdersPerPage] = useState(PER_PAGE_OPTIONS[0]);
  const [cancelledOrdersPage, setCancelledOrdersPage] = useState(defaultPage);
  const [cancelledOrdersPerPage, setCancelledOrdersPerPage] = useState(PER_PAGE_OPTIONS[0]);
  const [refundedOrdersPage, setRefundedOrdersPage] = useState(defaultPage);
  const [refundedOrdersPerPage, setRefundedOrdersPerPage] = useState(PER_PAGE_OPTIONS[0]);
  const dispatch = useDispatch();
  const orders = useSelector(state => selectOrdersByPage(state, allOrdersPage));
  const pendingOrders = useSelector(state => selectPendingOrdersByPage(state, pendingOrdersPage));
  const processingOrders = useSelector(state => selectProcessingOrdersByPage(state, processingOrdersPage));
  const cancelledOrders = useSelector(state => selectCancelledOrdersByPage(state, cancelledOrdersPage));
  const refundedOrders = useSelector(state => selectRefundedOrdersByPage(state, refundedOrdersPage));
  const { checkoutStripeStatus, checkoutStatus } = useSelector(state => state.checkout);
  const {
    getOrdersTotalPage,
    getPendingOrdersTotalPage,
    getProcessingOrdersTotalPage,
    getCancelledOrdersTotalPage,
    getRefundedOrdersTotalPage,
    getOrdersPages,
    getPendingOrdersPages,
    getProcessingOrdersPages,
    getCancelledOrdersPages,
    getRefundedOrdersPages,
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

      case STATUS.PROCESSING:
        dispatch(getProcessingOrders({
          page: defaultPage,
          pageSize: PER_PAGE_OPTIONS[0]
        }));
        break;

      case STATUS.CANCELLED:
        dispatch(getCancelledOrders({
          page: defaultPage,
          pageSize: PER_PAGE_OPTIONS[0]
        }));
        break;

      default:
        console.log('None supported tab.');
    }
  }, [tab]);

  useEffect(() => {
    dispatch(resetGetOrders());
    dispatch(resetGetPendingOrders());

    dispatch(getOrders({
      page: defaultPage,
      pageSize: allOrdersPerPage,
      status: defaultTab
    }));

    dispatch(getPendingOrders({
      page: defaultPage,
      pageSize: pendingOrdersPerPage,
      status: STATUS.PENDING
    }));
  }, [checkoutStatus, checkoutStripeStatus]);

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

  const handleProcessingOrdersPerPageChange = (event) => {
    setProcessingOrdersPerPage(event.target.value);
    setProcessingOrdersPage(defaultPage);
    dispatch(getProcessingOrders({
      page: defaultPage,
      pageSize: event.target.value
    }));
  };

  const handleProcessingOrdersPageChange = (event, value) => {
    setProcessingOrdersPage(value);

    const isPreviousSelectedPage = getProcessingOrdersPages.indexOf(value) > -1;

    if (!isPreviousSelectedPage) {
      dispatch(getProcessingOrders({
        page: value,
        pageSize: processingOrdersPerPage
      }));
    }
  };

  const handleCancelledOrdersPerPageChange = (event) => {
    setCancelledOrdersPerPage(event.target.value);
    setCancelledOrdersPage(defaultPage);
    dispatch(getCancelledOrders({
      page: defaultPage,
      pageSize: event.target.value
    }));
  };

  const handleCancelledOrdersPageChange = (event, value) => {
    setCancelledOrdersPage(value);

    const isPreviousSelectedPage = getCancelledOrdersPages.indexOf(value) > -1;

    if (!isPreviousSelectedPage) {
      dispatch(getCancelledOrders({
        page: value,
        pageSize: cancelledOrdersPerPage
      }));
    }
  };

  const handleRefundedOrdersPerPageChange = (event) => {
    setRefundedOrdersPerPage(event.target.value);
    setRefundedOrdersPage(defaultPage);
    dispatch(getRefundedOrders({
      page: defaultPage,
      pageSize: event.target.value
    }));
  };

  const handleRefundedOrdersPageChange = (event, value) => {
    setRefundedOrdersPage(value);

    const isPreviousSelectedPage = getRefundedOrdersPages.indexOf(value) > -1;

    if (!isPreviousSelectedPage) {
      dispatch(getRefundedOrders({
        page: value,
        pageSize: refundedOrdersPerPage
      }));
    }
  };

  return (
    <TabContext value={tab}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <TabList onChange={handleTabChange} aria-label='order-tabs'>
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
      <TabPanel sx={{ px: 0 }} value={STATUS.PROCESSING}>
        <OrderTab
          orders={processingOrders}
          page={processingOrdersPage}
          onPageChange={handleProcessingOrdersPageChange}
          perPage={processingOrdersPerPage}
          onPerPageChange={handleProcessingOrdersPerPageChange}
          perPageOptions={PER_PAGE_OPTIONS}
          totalPage={getProcessingOrdersTotalPage}
        />
      </TabPanel>
      <TabPanel sx={{ px: 0 }} value={STATUS.CANCELLED}>
        <OrderTab
          orders={cancelledOrders}
          page={cancelledOrdersPage}
          onPageChange={handleCancelledOrdersPageChange}
          perPage={cancelledOrdersPerPage}
          onPerPageChange={handleCancelledOrdersPerPageChange}
          perPageOptions={PER_PAGE_OPTIONS}
          totalPage={getCancelledOrdersTotalPage}
        />
      </TabPanel>
      <TabPanel sx={{ px: 0 }} value={STATUS.REFUNDED}>
        <OrderTab
          orders={refundedOrders}
          page={refundedOrdersPage}
          onPageChange={handleRefundedOrdersPageChange}
          perPage={refundedOrdersPerPage}
          onPerPageChange={handleRefundedOrdersPerPageChange}
          perPageOptions={PER_PAGE_OPTIONS}
          totalPage={getRefundedOrdersTotalPage}
        />
      </TabPanel>
    </TabContext>
  );
};

export default OrderTabs;
