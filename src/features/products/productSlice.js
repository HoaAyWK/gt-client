import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import ACTION_STATUS from "../../constants/actionStatus";
import productApi from "../../services/productApi";

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
  getProductStatus: ACTION_STATUS.IDLE,
  product: null,
  addReviewStatus: ACTION_STATUS.IDLE,
  editProductStatus: ACTION_STATUS.IDLE,
  editReviewStatus: ACTION_STATUS.IDLE,
});

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id) => {
    return await productApi.getProduct(id);
  }
);

export const addReview = createAsyncThunk(
  "product/addReview",
  async (data) => {
    const { productId, ...reviewData } = data;
    return await productApi.addReview(productId, reviewData);
  }
);

export const editReview = createAsyncThunk(
  'product/editReview',
  async (data) => {
    const { productId, reviewId, ...reviewData } = data;

    return await productApi.editReview(productId, reviewId, reviewData);
  }
);

const productSlice = createSlice({
  name: 'productDetails',
  initialState,
  extraReducers: (builder) => {
    builder


      .addCase(getProduct.pending, (state) => {
        state.getProductStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.getProductStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success)
        {
          state.product = action.payload.data;
        }
      })
      .addCase(getProduct.rejected, (state) => {
        state.getProductStatus = ACTION_STATUS.FAILED;
      })


      .addCase(addReview.pending, (state) => {
        state.addReviewStatus = ACTION_STATUS.LOADING;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.addReviewStatus = ACTION_STATUS.SUCCEEDED;
        console.log('addReview.fulfilled');
        if (action.payload.success) {
          console.log('addReview.fulfilled success');
          state.product = action.payload.data;
        }
      })
      .addCase(addReview.rejected, (state) => {
        state.addReviewStatus = ACTION_STATUS.FAILED;
      })


      .addCase(editReview.pending, (state) => {
        state.editReviewStatus = ACTION_STATUS.LOADING;
      })
      .addCase(editReview.fulfilled, (state, action) => {
        state.editReviewStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.product = action.payload.data;
        }
      })
      .addCase(editReview.rejected, (state) => {
        state.editReviewStatus = ACTION_STATUS.FAILED;
      })
  }
});

const { reducer } = productSlice;

export default reducer;
