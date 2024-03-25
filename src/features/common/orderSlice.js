import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../constants/actionStatus';
import orderApi from '../../services/orderApi';

const billsAdapter = createEntityAdapter();

const initialState = billsAdapter.getInitialState({
  totalMyBillsPage: 0,
  myBillsPerPage: 0,
  bill: null,
  getMyBillsStatus: ACTION_STATUS.IDLE,
  getSingleBillStatus: ACTION_STATUS.IDLE,
  cancelOrderStatus: ACTION_STATUS.IDLE
});

export const getMyBills = createAsyncThunk(
  'bill/my',
  async ({ page, status }) => {
    return await orderApi.getMyBill(status, 5, page);
  }
);

export const getSingleBill = createAsyncThunk(
  'bill/single',
  async (id) => {
    return await orderApi.getSingle(id);
  }
);

export const cancelOrder = createAsyncThunk(
  'bill/cancel',
  async (id) => {
    return await orderApi.cancel(id);
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearGetDataStatus: (state) => {
      state.getMyBillsStatus = ACTION_STATUS.IDLE;
    },
    refresh: (state) => {
      state.cancelOrderStatus = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder


      .addCase(getMyBills.pending, (state) => {
        state.getMyBillsStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getMyBills.fulfilled, (state, action) => {
        state.getMyBillsStatus = ACTION_STATUS.SUCCEEDED;
        state.totalMyBillsPage = action.payload.totalPage;
        state.myBillsPerPage = action.payload.perPage;
        billsAdapter.setAll(state, action.payload.bills);
      })
      .addCase(getMyBills.rejected, (state) => {
        state.getMyBillsStatus = ACTION_STATUS.FAILED;
      })


      .addCase(getSingleBill.pending, (state) => {
        state.getSingleBillStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getSingleBill.fulfilled, (state, action) => {
        state.getSingleBillStatus = ACTION_STATUS.SUCCEEDED;
        state.bill = action.payload;
      })
      .addCase(getSingleBill.rejected, (state) => {
        state.getMyBillsStatus = ACTION_STATUS.FAILED;
      })


      .addCase(cancelOrder.pending, (state) => {
        state.cancelOrderStatus = ACTION_STATUS.LOADING;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelOrderStatus = ACTION_STATUS.SUCCEEDED;
        const { id, ...data } = action.payload.bill;

        billsAdapter.updateOne(state, { id, changes: data });
      })
      .addCase(cancelOrder.rejected, (state) => {
        state.cancelOrderStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllBills,
  selectById: selectBillById
} = billsAdapter.getSelectors(state => state.orders);

const { reducer, actions } = orderSlice;

export const { clearGetDataStatus, refresh } = actions;

export default reducer;
