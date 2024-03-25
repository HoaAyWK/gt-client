import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import productReviewApi from '../../../services/productReviewApi';
import ACTION_STATUS from '../../../constants/actionStatus';

const initialState = {
  reviews: [],
  getReviewsStatus: ACTION_STATUS.IDLE,
  createReviewStatus: ACTION_STATUS.IDLE,
  editReviewStatus: ACTION_STATUS.IDLE,
};

export const getProductReviewsByProductId = createAsyncThunk(
  'productReviews/reviewsByProductId',
  async (id) => {
    return await productReviewApi.getProductReviewsByProductId(id);
  }
);

export const createProductReview = createAsyncThunk(
  'productReviews/create',
  async (data) => {
    const res = await productReviewApi.createrProductReview(data);

    return res;
  }
);

export const editProductReview = createAsyncThunk(
  'productReviews/edit',
  async (data) => {
    return await productReviewApi.edit(data);
  }
);

const productReviewsSlice = createSlice({
  name: 'productReviews',
  initialState,
  reducers: {
    refresh: (state) => {
      state.createReviewStatus = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder


      .addCase(getProductReviewsByProductId.pending, (state) => {
        state.getReviewsStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getProductReviewsByProductId.fulfilled, (state, action) => {
        state.getReviewsStatus = ACTION_STATUS.SUCCEEDED;
        state.reviews = action.payload;
      })
      .addCase(getProductReviewsByProductId.rejected, (state) => {
        state.getReviewsStatus = ACTION_STATUS.FAILED;
      })


      .addCase(createProductReview.pending, (state) => {
        state.createReviewStatus = ACTION_STATUS.LOADING;
      })
      .addCase(createProductReview.fulfilled, (state) => {
        state.createReviewStatus = ACTION_STATUS.SUCCEEDED;
        // state.reviews.push(action.payload);
      })
      .addCase(createProductReview.rejected, (state) => {
        state.createReviewStatus = ACTION_STATUS.FAILED;
      })

      .addCase(editProductReview.pending, (state) => {
        state.editReviewStatus = ACTION_STATUS.LOADING;
      })
      .addCase(editProductReview.fulfilled, (state) => {
        state.editReviewStatus = ACTION_STATUS.SUCCEEDED;
      })
      .addCase(editProductReview.rejected, (state) => {
        state.editReviewStatus = ACTION_STATUS.FAILED;
      })
  }
});

const { reducer, actions } = productReviewsSlice;

export const { refresh } = actions;

export default reducer;

