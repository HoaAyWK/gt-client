import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import ACTION_STATUS from "../../constants/actionStatus";
import productApi from "../../services/productApi";

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
  getProductStatus: ACTION_STATUS.IDLE,
  product: null
});

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id) => {
    return await productApi.getProduct(id);
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
  }
});

const { reducer } = productSlice;

export default reducer;
