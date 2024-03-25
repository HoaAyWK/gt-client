import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import bannerApi from '../../../services/bannerApi';
import ACTION_STATUS from '../../../constants/actionStatus';

const bannersAdapter = createEntityAdapter();

const initialState = bannersAdapter.getInitialState({
  getBannersStatus: ACTION_STATUS.IDLE,
});

export const getBanners = createAsyncThunk(
  'banners/all',
  async () => {
    return await bannerApi.getAll();
  }
);

const bannerSlice = createSlice({
  name: 'banners',
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(getBanners.pending, (state) => {
        state.getBannersStatus = ACTION_STATUS.IDLE;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.getBannersStatus = ACTION_STATUS.SUCCEEDED;
        bannersAdapter.setAll(state, action.payload);
      })
      .addCase(getBanners.rejected, (state) => {
        state.getBannersStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllBanners,
  selectById: selectBannerById,
  selectIds: selectBannerIds,
} = bannersAdapter.getSelectors((state) => state.banners);

const { reducer } = bannerSlice;

export default reducer;
