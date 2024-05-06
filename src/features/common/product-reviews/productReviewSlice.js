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
    return await productReviewApi.edit(data);
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
      .addCase(addReview.fulfilled, (state) => {
        state.addReviewStatus = ACTION_STATUS.SUCCEEDED;
        // state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state) => {
        state.addReviewStatus = ACTION_STATUS.FAILED;
      })
  }
});

const { reducer } = productReviewsSlice;

export default reducer;

