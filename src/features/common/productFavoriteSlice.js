import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../constants/actionStatus';
import productFavoriteApi from '../../services/productFavoriteApi';

const favoritesAdapter = createEntityAdapter();

const initialState = favoritesAdapter.getInitialState({
  getFavoritesStatus: ACTION_STATUS.IDLE,
  createFavoriteStatus: ACTION_STATUS.IDLE,
  deleteFavoriteStatus: ACTION_STATUS.IDLE
});

export const getMyFavorites = createAsyncThunk(
  'favorites/my',
  async () => {
    return await productFavoriteApi.getMyFavorites();
  }
);

export const createFavorite = createAsyncThunk(
  'favorites/create',
  async (data) => {
    return await productFavoriteApi.create(data);
  }
);

export const deleteFavorite = createAsyncThunk(
  'favorites/delete',
  async (id) => {
    return await productFavoriteApi.delete(id);
  }
);

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    refresh: (state) => {
      state.createFavoriteStatus = ACTION_STATUS.IDLE;
      state.deleteFavoriteStatus = ACTION_STATUS.IDLE;
    },
    clearData: (state) => {
      state.getFavoritesStatus = ACTION_STATUS.IDLE;
      favoritesAdapter.setAll(state, []);
    }
  },
  extraReducers: (builder) => {
    builder


      .addCase(getMyFavorites.pending, (state) => {
        state.getFavoritesStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getMyFavorites.fulfilled, (state, action) => {
        state.getFavoritesStatus = ACTION_STATUS.SUCCEEDED;
        favoritesAdapter.setAll(state, action.payload);
      })
      .addCase(getMyFavorites.rejected, (state) => {
        state.getFavoritesStatus = ACTION_STATUS.FAILED;
      })


      .addCase(createFavorite.pending, (state) => {
        state.createFavoriteStatus = ACTION_STATUS.LOADING;
      })
      .addCase(createFavorite.fulfilled, (state, action) => {
        state.createFavoriteStatus = ACTION_STATUS.SUCCEEDED;
        favoritesAdapter.addOne(state, action.payload);
      })
      .addCase(createFavorite.rejected, (state) => {
        state.createFavoriteStatus = ACTION_STATUS.FAILED;
      })



      .addCase(deleteFavorite.pending, (state) => {
        state.deleteFavoriteStatus = ACTION_STATUS.LOADING;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.deleteFavoriteStatus = ACTION_STATUS.SUCCEEDED;
        favoritesAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteFavorite.rejected, (state) => {
        state.deleteFavoriteStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllFavorites,
} = favoritesAdapter.getSelectors(state => state.favorites);

const { actions, reducer } = favoriteSlice;

export const { refresh, clearData } = actions;

export default reducer;

