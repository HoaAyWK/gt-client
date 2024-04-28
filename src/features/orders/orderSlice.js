import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import ACTION_STATUS from "../../constants/actionStatus";
import orderApi from "../../services/orderApi";
import { STATUS } from "../../constants/orderStatus";

const orderAdapter = createEntityAdapter();

const orderAdapterInitialState = orderAdapter.getInitialState({
  getOrdersStatus: ACTION_STATUS.IDLE,
  getOrdersPages: [],
  getOrdersPageSize: 5,
  getOrdersTotalPage: 0,
  pendingOrders: [],
  getPendingOrdersStatus: ACTION_STATUS.IDLE,
  getPendingOrdersPages: [],
  getPendingOrdersPageSize: 5,
  getPendingOrdersTotalPage: 0,
});


export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (data) => {
    const { page, pageSize, status } = data;
    return await orderApi.getOrders(page, pageSize, status);
  }
);

export const getPendingOrders = createAsyncThunk(
  'orders/getPendingOrders',
  async (data) => {
    const { page, pageSize } = data;
    return await orderApi.getOrders(page, pageSize, STATUS.PENDING);
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: orderAdapterInitialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder


      .addCase(getOrders.pending, (state) => {
        state.getOrdersStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.getOrdersStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          const { page, pageSize, items, totalPages } = action.payload.data;

          const orders = items.map(order => ({ page, ...order }));

          if (pageSize != state.getOrdersPageSize) {

            orderAdapter.setAll(state, orders);
            state.getOrdersPages = [];
            state.getOrdersPages.push(page);
            state.getOrdersPageSize = pageSize;
            state.getOrdersTotalPage = totalPages;

            return;
          }

          const isPreviousSelectedPage = state.getOrdersPages.indexOf(page) > -1;

          if (!isPreviousSelectedPage) {
            state.getOrdersPages.push(page);
            orderAdapter.addMany(state, orders);
          }

          state.getOrdersPageSize = pageSize;
          state.getOrdersTotalPage = totalPages;
        }
      })
      .addCase(getOrders.rejected, (state) => {
        state.getOrdersStatus = ACTION_STATUS.FAILED;
      })


      .addCase(getPendingOrders.pending, (state) => {
        state.getPendingOrdersStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getPendingOrders.fulfilled, (state, action) => {
        state.getPendingOrdersStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          const { page, pageSize, items, totalPages } = action.payload.data;

          const orders = items.map(order => ({ page, ...order }));

          if (pageSize != state.getPendingOrdersPageSize) {

            state.pendingOrders = orders;
            state.getPendingOrdersPages = [];
            state.getPendingOrdersPages.push(page);
            state.getPendingOrdersPageSize = pageSize;
            state.getPendingOrdersTotalPage = totalPages;

            return;
          }

          const isPreviousSelectedPage = state.getPendingOrdersPages.indexOf(page) > -1;

          if (!isPreviousSelectedPage) {
            state.getPendingOrdersPages.push(page);
            state.pendingOrders = state.pendingOrders.concat(orders);
          }

          state.getPendingOrdersPageSize = pageSize;
          state.getPendingOrdersTotalPage = totalPages;
        }
      })
      .addCase(getPendingOrders.rejected, (state) => {
        state.getPendingOrdersStatus = ACTION_STATUS.FAILED;
      });
  }
});

const { reducer } = orderSlice;

export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
} = orderAdapter.getSelectors((state) => state.orders);

export const selectOrdersByPage = createSelector(
  selectAllOrders,
  (_, page) => page,
  (orders, page) => orders.filter((order) => order.page === page)
);

export const selectPendingOrdersByPage = createSelector(
  state => state.orders.pendingOrders,
  (_, page) => page,
  (orders, page) => orders.filter((order) => order.page === page)
);

export default reducer;
