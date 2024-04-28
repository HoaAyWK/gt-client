import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../constants/actionStatus';
import cartApi from '../../services/cartApi';

const initialState = {
  cart: null,
  checkoutClicked: false,
  getCartStatus: ACTION_STATUS.IDLE,
  addToCartStatus: ACTION_STATUS.IDLE,
  checkItemStatus: ACTION_STATUS.IDLE,
  checkAllStatus: ACTION_STATUS.IDLE,
  removeItemStatus: ACTION_STATUS.IDLE,
  removeMultiItemsStatus: ACTION_STATUS.IDLE,
};

export const getCart = createAsyncThunk(
  'cart/get',
  async () => {
    return await cartApi.get();
  }
);

export const addToCart = createAsyncThunk(
  'cart/add',
  async (item) => {
    return await cartApi.addToCart(item);
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/remove',
  async (itemId) => {
    return await cartApi.removeFromCart(itemId);
  }
);

export const checkItem = createAsyncThunk(
  'cart/checkItem',
  async (data) => {
    return await cartApi.checkItem(data);
  }
);

export const checkAll = createAsyncThunk(
  'cart/checkAll',
  async (data) => {
    return await cartApi.checkAll(data);
  }
);

export const removeItem = createAsyncThunk(
  'cart/remove',
  async (data) => {
    return await cartApi.removeFromCart(data);
  }
);

export const removeMultiItems = createAsyncThunk(
  'cart/removeMulti',
  async (data) => {
    return await cartApi.removeMultiFromCart(data);
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    refresh: (state) => {
      state.addToCartStatus = ACTION_STATUS.IDLE;
      state.removeFromCartStatus = ACTION_STATUS.IDLE;
      state.decreaseQuantity = ACTION_STATUS.IDLE;
    },
    clearData: (state) => {
      state.cart = null;
      state.getCartStatus = ACTION_STATUS.IDLE;
    },
    setEmptyCart: (state) => {
      if (state.cart && state.cart.items) {
        state.cart.items = [];
        state.cart.totalAmountWithDiscount = 0;
      }
    },
    clickCheckout: (state) => {
      state.checkoutClicked = true;
    },
    clearCheckoutClick: (state) => {
      state.checkoutClicked = false;
    }
  },
  extraReducers: (builder) => {
    builder


      .addCase(getCart.pending, (state) => {
        state.getCartStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.getCartStatus = ACTION_STATUS.SUCCEEDED;
        if (action.payload.success) {
          state.cart = action.payload.data;
        }
      })
      .addCase(getCart.rejected, (state) => {
        state.getCartStatus = ACTION_STATUS.FAILED;
      })



      .addCase(addToCart.pending, (state) => {
        state.addToCartStatus = ACTION_STATUS.LOADING;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addToCartStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.cart = action.payload.data;
        }
      })
      .addCase(addToCart.rejected, (state) => {
        state.addToCartStatus = ACTION_STATUS.FAILED;
      })



      .addCase(checkItem.pending, (state) => {
        state.checkItemStatus = ACTION_STATUS.LOADING;
      })
      .addCase(checkItem.fulfilled, (state, action) => {
        state.checkItemStatus = ACTION_STATUS.SUCCEEDED;
        state.cart = action.payload;
      })
      .addCase(checkItem.rejected, (state) => {
        state.checkItemStatus = ACTION_STATUS.FAILED;
      })



      .addCase(checkAll.pending, (state) => {
        state.checkAllStatus = ACTION_STATUS.LOADING;
      })
      .addCase(checkAll.fulfilled, (state, action) => {
        state.checkAllStatus = ACTION_STATUS.SUCCEEDED;
        state.cart = action.payload;
      })
      .addCase(checkAll.rejected, (state) => {
        state.checkAllStatus = ACTION_STATUS.FAILED;
      })


      .addCase(removeItem.pending, (state) => {
        state.removeItemStatus = ACTION_STATUS.LOADING;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.removeItemStatus = ACTION_STATUS.SUCCEEDED;
        state.cart = action.payload;
      })
      .addCase(removeItem.rejected, (state) => {
        state.removeItemStatus = ACTION_STATUS.FAILED;
      })



      .addCase(removeMultiItems.pending, (state) => {
        state.removeMultiItemsStatus = ACTION_STATUS.LOADING;
      })
      .addCase(removeMultiItems.fulfilled, (state, action) => {
        state.removeMultiItemsStatus = ACTION_STATUS.SUCCEEDED;
        state.cart = action.payload;
      })
      .addCase(removeMultiItems.rejected, (state) => {
        state.removeMultiItemsStatus = ACTION_STATUS.FAILED;
      })
  }
});

const { reducer, actions } = cartSlice;

export const { refresh, clearCheckoutClick, clickCheckout, clearData, setEmptyCart } = actions;

export default reducer;
