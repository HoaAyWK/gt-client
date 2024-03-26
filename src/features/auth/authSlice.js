import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../constants/actionStatus';
import authApi from '../../services/authApi';
import { getCart } from '../common/cartSlice';

const initialState = {
  user: null,
  isAuthenticated: false,
  loginStatus: ACTION_STATUS.IDLE,
  getCurrentUserStatus: ACTION_STATUS.IDLE,
  registerStatus: ACTION_STATUS.IDLE,
};

export const login = createAsyncThunk(
  'login',
  async (body, thunkApi) => {
    const res = await authApi.login(body);
    if (res.success) {
      localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
      thunkApi.dispatch(getCurrentUserInfo());
      // thunkApi.dispatch(getCart(res.userId));
    }
    return res;
  }
);

export const getCurrentUserInfo = createAsyncThunk(
  'getCurrentUser',
  async () => {
    return await authApi.getCurrentUserInfo();
  }
);

export const register = createAsyncThunk(
  'register',
  async (body) => {
    return await authApi.register(body);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.setItem('accessToken', null);
      localStorage.setItem('cart', null);
      state.user = null;
      state.isAuthenticated = false;
      state.getCurrentUserStatus = ACTION_STATUS.IDLE;
      state.loginStatus = ACTION_STATUS.IDLE;
      state.registerStatus = ACTION_STATUS.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loginStatus = ACTION_STATUS.LOADING;
      })
      .addCase(login.fulfilled, (state) => {
        state.loginStatus = ACTION_STATUS.SUCCEEDED;
      })
      .addCase(login.rejected, (state) => {
        state.loginStatus = ACTION_STATUS.FAILED;
      })

      .addCase(getCurrentUserInfo.pending, (state) => {
        state.getCurrentUserStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getCurrentUserInfo.fulfilled, (state, action) => {
        state.getCurrentUserStatus = ACTION_STATUS.SUCCEEDED;
        if (action.payload.success) {
          state.isAuthenticated = true;
          state.user = { ...action.payload.data };
        }
      })
      .addCase(getCurrentUserInfo.rejected, (state) => {
        state.getCurrentUserStatus = ACTION_STATUS.FAILED
      })

      .addCase(register.pending, (state) => {
        state.registerStatus = ACTION_STATUS.LOADING;
      })
      .addCase(register.fulfilled, (state) => {
        state.registerStatus = ACTION_STATUS.SUCCEEDED;
      })
      .addCase(register.rejected, (state) => {
        state.registerStatus = ACTION_STATUS.FAILED;
      })
  }
});

const { reducer, actions } = authSlice;

export const { logout } = actions;

export default reducer;
