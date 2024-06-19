import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import ACTION_STATUS from "../../constants/actionStatus";
import orderApi from "../../services/orderApi";
import { STATUS } from "../../constants/orderStatus";

const orderAdapter = createEntityAdapter();

const orderAdapterInitialState = orderAdapter.getInitialState({
  order: null,
  ordersByProductIdAndProductVariantId: [],
  getOrdersByProductIdAndProductVariantIdStatus: ACTION_STATUS.IDLE,
  confirmOrderReceivedStatus: ACTION_STATUS.IDLE,
  getOrderStatus: ACTION_STATUS.IDLE,
  getOrdersStatus: ACTION_STATUS.IDLE,
  getOrdersPages: [],
  getOrdersPageSize: 5,
  getOrdersTotalPage: 0,
  pendingOrders: [],
  getPendingOrdersStatus: ACTION_STATUS.IDLE,
  getPendingOrdersPages: [],
  getPendingOrdersPageSize: 5,
  getPendingOrdersTotalPage: 0,
  processingOrders: [],
  getProcessingOrdersStatus: ACTION_STATUS.IDLE,
  getProcessingOrdersPages: [],
  getProcessingOrdersPageSize: 5,
  getProcessingOrdersTotalPage: 0,
  cancelledOrders: [],
  getCancelledOrdersStatus: ACTION_STATUS.IDLE,
  getCancelledOrdersPages: [],
  getCancelledOrdersPageSize: 5,
  getCancelledOrdersTotalPage: 0,
  refundedOrders: [],
  getRefundedOrdersStatus: ACTION_STATUS.IDLE,
  getRefundedOrdersPages: [],
  getRefundedOrdersPageSize: 5,
  getRefundedOrdersTotalPage: 0,
  cancelOrderStatus: ACTION_STATUS.IDLE,
});

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (orderId) => {
    return await orderApi.cancelOrder(orderId);
  }
);

export const getOrder = createAsyncThunk(
  'orders/getOrder',
  async (orderId) => {
    return await orderApi.getOrder(orderId);
  }
);

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

export const getProcessingOrders = createAsyncThunk(
  'orders/getProcessingOrders',
  async (data) => {
    const { page, pageSize } = data;
    return await orderApi.getOrders(page, pageSize, STATUS.PROCESSING);
  }
);

export const getRefundedOrders = createAsyncThunk(
  'orders/getRefundedOrders',
  async (data) => {
    const { page, pageSize } = data;
    return await orderApi.getOrders(page, pageSize, STATUS.REFUNDED);
  }
);

export const getCancelledOrders = createAsyncThunk(
  'orders/getCancelledOrders',
  async (data) => {
    const { page, pageSize } = data;
    return await orderApi.getOrders(page, pageSize, STATUS.CANCELLED);
  }
);

export const confirmOrderReceived = createAsyncThunk(
  'orders/confirmOrderReceived',
  async (orderId) => {
    return await orderApi.confirmOrderReceived(orderId);
  }
);

export const getOrdersByProductIdAndProductVariantId = createAsyncThunk(
  'orders/getOrdersByProductIdAndProductVariantId',
  async (data) => {
    const { productId, productVariantId } = data;
    return await orderApi.getOrdersByProductIdAndProductVariantId(productId, productVariantId);
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: orderAdapterInitialState,
  reducers: {
    resetGetCancelledOrdersPages: (state) => {
      state.getCancelledOrdersPages = [];
    },
    resetGetPendingOrders: (state) => {
      state.getPendingOrdersPages = [];
      state.pendingOrders = [];
    },
    resetGetOrders: (state) => {
      state.getOrdersPages = [];
      orderAdapter.removeAll(state);
    }
  },
  extraReducers: (builder) => {
    builder


      .addCase(getOrder.pending, (state) => {
        state.getOrderStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.getOrderStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.order = action.payload.data;
        }
      })
      .addCase(getOrder.rejected, (state) => {
        state.getOrderStatus = ACTION_STATUS.FAILED;
      })


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
      })



      .addCase(getProcessingOrders.pending, (state) => {
        state.getProcessingOrdersStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getProcessingOrders.fulfilled, (state, action) => {
        state.getProcessingOrdersStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          const { page, pageSize, items, totalPages } = action.payload.data;

          const orders = items.map(order => ({ page, ...order }));

          if (pageSize != state.getProcessingOrdersPageSize) {

            state.processingOrders = orders;
            state.getProcessingOrdersPages = [];
            state.getProcessingOrdersPages.push(page);
            state.getProcessingOrdersPageSize = pageSize;
            state.getProcessingOrdersTotalPage = totalPages;

            return;
          }

          const isPreviousSelectedPage = state.getProcessingOrdersPages.indexOf(page) > -1;

          if (!isPreviousSelectedPage) {
            state.getProcessingOrdersPages.push(page);
            state.processingOrders = state.processingOrders.concat(orders);
          }

          state.getProcessingOrdersPageSize = pageSize;
          state.getProcessingOrdersTotalPage = totalPages;
        }
      })
      .addCase(getProcessingOrders.rejected, (state) => {
        state.getProcessingOrdersStatus = ACTION_STATUS.FAILED;
      })


      .addCase(getCancelledOrders.pending, (state) => {
        state.getCancelledOrdersStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getCancelledOrders.fulfilled, (state, action) => {
        state.getCancelledOrdersStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          const { page, pageSize, items, totalPages } = action.payload.data;

          const orders = items.map(order => ({ page, ...order }));

          if (pageSize != state.getCancelledOrdersPageSize) {

            state.cancelledOrders = orders;
            state.getCancelledOrdersPages = [];
            state.getCancelledOrdersPages.push(page);
            state.getCancelledOrdersPageSize = pageSize;
            state.getCancelledOrdersTotalPage = totalPages;

            return;
          }

          const isPreviousSelectedPage = state.getCancelledOrdersPages.indexOf(page) > -1;

          if (!isPreviousSelectedPage) {
            state.getCancelledOrdersPages.push(page);
            state.cancelledOrders = state.cancelledOrders.concat(orders);
          }

          state.getCancelledOrdersPageSize = pageSize;
          state.getCancelledOrdersTotalPage = totalPages;
        }
      })
      .addCase(getCancelledOrders.rejected, (state) => {
        state.getCancelledOrdersStatus = ACTION_STATUS.FAILED;
      })


      .addCase(getRefundedOrders.pending, (state) => {
        state.getRefundedOrdersStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getRefundedOrders.fulfilled, (state, action) => {
        state.getRefundedOrdersStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          const { page, pageSize, items, totalPages } = action.payload.data;

          const orders = items.map(order => ({ page, ...order }));

          if (pageSize != state.getRefundedOrdersPageSize) {

            state.refundedOrders = orders;
            state.getRefundedOrdersPages = [];
            state.getRefundedOrdersPages.push(page);
            state.getRefundedOrdersPageSize = pageSize;
            state.getRefundedOrdersTotalPage = totalPages;

            return;
          }

          const isPreviousSelectedPage = state.getRefundedOrdersPages.indexOf(page) > -1;

          if (!isPreviousSelectedPage) {
            state.getRefundedOrdersPages.push(page);
            state.refundedOrders = state.refundedOrders.concat(orders);
          }

          state.getRefundedOrdersPageSize = pageSize;
          state.getRefundedOrdersTotalPage = totalPages;
        }
      })
      .addCase(getRefundedOrders.rejected, (state) => {
        state.getRefundedOrdersStatus = ACTION_STATUS.FAILED;
      })


      .addCase(confirmOrderReceived.pending, (state) => {
        state.confirmOrderReceivedStatus = ACTION_STATUS.LOADING;
      })
      .addCase(confirmOrderReceived.fulfilled, (state, action) => {
        state.confirmOrderReceivedStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.order = action.payload.data;
        }
      })
      .addCase(confirmOrderReceived.rejected, (state) => {
        state.confirmOrderReceivedStatus = ACTION_STATUS.FAILED;
      })


      .addCase(getOrdersByProductIdAndProductVariantId.pending, (state) => {
        state.getOrdersByProductIdAndProductVariantIdStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getOrdersByProductIdAndProductVariantId.fulfilled, (state, action) => {
        state.getOrdersByProductIdAndProductVariantIdStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.ordersByProductIdAndProductVariantId = action.payload.data.data;
        }
      })
      .addCase(getOrdersByProductIdAndProductVariantId.rejected, (state) => {
        state.getOrdersByProductIdAndProductVariantIdStatus = ACTION_STATUS.FAILED;
      })



      .addCase(cancelOrder.pending, (state) => {
        state.cancelOrderStatus = ACTION_STATUS.LOADING;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelOrderStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          const order = state.pendingOrders.find(order => order.id === action.payload.data.id);
          if (order) {
            state.pendingOrders = state.pendingOrders.filter(order => order.id !== action.payload.data.id);
            state.cancelledOrders.push({ ...order, orderStatus: STATUS.CANCELLED })
          }
        }
      })
      .addCase(cancelOrder.rejected, (state) => {
        state.cancelOrderStatus = ACTION_STATUS.FAILED;
      })
  }
});

const { reducer, actions } = orderSlice;

export const {
  resetGetCancelledOrdersPages,
  resetGetPendingOrders,
  resetGetOrders
} = actions;

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

export const selectProcessingOrdersByPage = createSelector(
  state => state.orders.processingOrders,
  (_, page) => page,
  (orders, page) => orders.filter((order) => order.page === page)
);

export const selectCancelledOrdersByPage = createSelector(
  state => state.orders.cancelledOrders,
  (_, page) => page,
  (orders, page) => orders.filter((order) => order.page === page)
);

export const selectRefundedOrdersByPage = createSelector(
  state => state.orders.refundedOrders,
  (_, page) => page,
  (orders, page) => orders.filter((order) => order.page === page)
);

export default reducer;
