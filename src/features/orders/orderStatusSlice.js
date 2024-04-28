import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import ACTION_STATUS from '../../constants/actionStatus';
import orderApi from '../../services/orderApi';

const orderStatusAdapter = createEntityAdapter();

const initialState = orderStatusAdapter.getInitialState({
  getOrderStatusesStatus: ACTION_STATUS.IDLE,
});

export const getOrderStatuses = createAsyncThunk(
  'orders/getOrderStatuses',
  async () => {
    return await orderApi.getOrderStatues();
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder
      .addCase(getOrderStatuses.pending, (state) => {
        state.getOrderStatusesStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getOrderStatuses.fulfilled, (state, action) => {
        state.getOrderStatusesStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          const data = action.payload.data;
          const statusKeys = Object.keys(data);
          const statuses = statusKeys.map(key => ({ id: data[key].value, ...data[key] }));
          orderStatusAdapter.setAll(state, statuses);
        }
      })
      .addCase(getOrderStatuses.rejected, (state) => {
        state.getOrderStatusesStatus = ACTION_STATUS.FAILED;
      })
  }
});


const { reducer } = orderSlice;

export const {
  selectAll: selectAllOrderStatuses,
  selectById: selectOrderStatusById
} = orderStatusAdapter.getSelectors((state) => state.orderStatuses);

export default reducer;
