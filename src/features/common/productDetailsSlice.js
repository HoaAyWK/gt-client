import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import productDetailsApi from '../../services/productDetailsApi';
import ACTION_STATUS from '../../constants/actionStatus';

const productsPerCategoryAdapter = createEntityAdapter();

const initialState = productsPerCategoryAdapter.getInitialState({
  getProductsPerCategoryStatus: ACTION_STATUS.IDLE,
  getSingleStatus: ACTION_STATUS.IDLE,
  totalItems: 0,
  productSingle: null
});


export const getProductDetailSingle = createAsyncThunk(
  'productDetails/single',
  async (id) => {
    return await productDetailsApi.getSingle(id);
  }
);

export const getProductsPerCategory = createAsyncThunk(
  'productDetails/productsPerCategory',
  async () => {
    return await productDetailsApi.getProductsPerCategory();
  }
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  extraReducers: (builder) => {
    builder


      .addCase(getProductsPerCategory.pending, (state) => {
        state.getProductsPerCategoryStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getProductsPerCategory.fulfilled, (state, action) => {
        state.getProductsPerCategoryStatus = ACTION_STATUS.SUCCEEDED;
        productsPerCategoryAdapter.setAll(state, action.payload);
      })
      .addCase(getProductsPerCategory.rejected, (state) => {
        state.getProductsPerCategoryStatus = ACTION_STATUS.FAILED;
      })


      .addCase(getProductDetailSingle.pending, (state) => {
        state.getSingleStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getProductDetailSingle.fulfilled, (state, action) => {
        state.getSingleStatus = ACTION_STATUS.SUCCEEDED;
        state.productSingle = action.payload;
      })
      .addCase(getProductDetailSingle.rejected, (state) => {
        state.getSingleStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllProductDetails,
  selectById: selectProductsByCategoryName
} = productsPerCategoryAdapter.getSelectors((state) => state.productDetails);

const { reducer } = productDetailsSlice;

export default reducer;
