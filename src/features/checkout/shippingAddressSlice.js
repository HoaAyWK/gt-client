import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../constants/actionStatus';
import shippingAddressApi from '../../services/shippingAddressApi';

const shippingAddressesAdapter = createEntityAdapter();

const initialState = shippingAddressesAdapter.getInitialState({
  getShippingAddressesStatus: ACTION_STATUS.IDLE,
  addShippingAddressStatus: ACTION_STATUS.IDLE,
  deleteShippingAddressStatus: ACTION_STATUS.IDLE
});


export const getShippingAddresses = createAsyncThunk(
  'shippingAddress/my',
  async () => {
    return await shippingAddressApi.getMyShippingAddresses();
  }
);

export const addShippingAddress = createAsyncThunk(
  'shippingAddress/add',
  async (data) => {
    const shippingAddress = {
      acceptorName: data.fullName,
      acceptorPhone: data.phone,
      deliveryAddress: data.address
    };

    return await shippingAddressApi.add(shippingAddress);
  }
);

export const deleteShippingAddress = createAsyncThunk(
  'shippingAddress/delete',
  async (id) => {
    return await shippingAddressApi.delete(id);
  }
);

const shippingAddressSlice = createSlice({
  name: 'shippingAddress',
  initialState,
  reducers: {
    refresh: (state) => {
      state.addShippingAddressStatus = ACTION_STATUS.IDLE;
      state.deleteShippingAddressStatus = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder


      .addCase(getShippingAddresses.pending, (state) => {
        state.getShippingAddressesStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getShippingAddresses.fulfilled, (state, action) => {
        state.getShippingAddressesStatus = ACTION_STATUS.SUCCEEDED;
        shippingAddressesAdapter.setAll(state, action.payload);
      })
      .addCase(getShippingAddresses.rejected, (state) => {
        state.getShippingAddressesStatus = ACTION_STATUS.FAILED;
      })


      .addCase(addShippingAddress.pending, (state) => {
        state.addShippingAddressStatus = ACTION_STATUS.LOADING;
      })
      .addCase(addShippingAddress.fulfilled, (state, action) => {
        state.addShippingAddressStatus = ACTION_STATUS.SUCCEEDED;
        shippingAddressesAdapter.addOne(state, action.payload);
      })
      .addCase(addShippingAddress.rejected, (state) => {
        state.addShippingAddressStatus = ACTION_STATUS.FAILED;
      })


      .addCase(deleteShippingAddress.pending, (state) => {
        state.deleteShippingAddressStatus = ACTION_STATUS.LOADING;
      })
      .addCase(deleteShippingAddress.fulfilled, (state, action) => {
        state.deleteShippingAddressStatus = ACTION_STATUS.SUCCEEDED;
        shippingAddressesAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteShippingAddress.rejected, (state) => {
        state.deleteShippingAddressStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllShippingAddresses,
  selectById: selectShippingAddressById
} = shippingAddressesAdapter.getSelectors(state => state.shippingAddresses);

const { reducer, actions } = shippingAddressSlice;

export const { refresh } = actions;

export default reducer;
