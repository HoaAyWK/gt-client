import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import brandApi from '../../../services/brandApi';
import ACTION_STATUS from '../../../constants/actionStatus';

const brandsAdapter = createEntityAdapter();

const initialState = brandsAdapter.getInitialState({
  getBrandsStatus: ACTION_STATUS.IDLE,
});

export const getBrands = createAsyncThunk(
  'brands/getBrands',
  async (params) => {
    return await brandApi.getBrands(params);
  }
);

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(getBrands.pending, (state) => {
        state.getBrandsStatus = ACTION_STATUS.IDLE;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.getBrandsStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          brandsAdapter.setAll(state, action.payload.data.items);
        }
      })
      .addCase(getBrands.rejected, (state) => {
        state.getBrandsStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllBrands,
  selectById: selectBrandById,
  selectIds: selectBrandIds,
} = brandsAdapter.getSelectors((state) => state.brands);

const { reducer } = brandSlice;

export default reducer;
