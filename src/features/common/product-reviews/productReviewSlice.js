import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import productApi from '../../../services/productApi';
import ACTION_STATUS from '../../../constants/actionStatus';

const initialState = {
  addReviewStatus: ACTION_STATUS.IDLE,
  editReviewStatus: ACTION_STATUS.IDLE,
};

export const addReview = createAsyncThunk(
  'productReviews/create',
  async (data) => {
    const { id, ...rest } = data;

    return await productApi.addReview(id, rest);
  }
);

export const editProductReview = createAsyncThunk(
  'productReviews/edit',
  async (data) => {
    const { id, reviewId, ...rest } = data;
    return await productApi.editReview(id, reviewId, rest);
  }
);

const productReviewsSlice = createSlice({
  name: 'productReviews',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder


      .addCase(addReview.pending, (state) => {
        state.addReviewStatus = ACTION_STATUS.LOADING;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.addReviewStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.product = action.payload.data;
        }
      })
      .addCase(addReview.rejected, (state) => {
        state.addReviewStatus = ACTION_STATUS.FAILED;
      })
  }
});

const { reducer } = productReviewsSlice;

export default reducer;

