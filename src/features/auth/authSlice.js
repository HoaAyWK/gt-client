import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../constants/actionStatus';
import authApi from '../../services/authApi';
import { getCart } from '../common/cartSlice';

const initialState = {
  user: null,
  isAuthenticated: false,
  loginStatus: ACTION_STATUS.IDLE,
  logoutStatus: ACTION_STATUS.IDLE,
  getCurrentUserStatus: ACTION_STATUS.IDLE,
  registerStatus: ACTION_STATUS.IDLE,
  addAddressStatus: ACTION_STATUS.IDLE,
  updateAddressStatus: ACTION_STATUS.IDLE,
  deleteAddressStatus: ACTION_STATUS.IDLE,
  statusCode: null
};

export const login = createAsyncThunk(
  'login',
  async (body, thunkApi) => {
    const res = await authApi.login(body);
    if (res.success) {
      localStorage.setItem('accessToken', JSON.stringify(res.data.token));
      thunkApi.dispatch(getCurrentUserInfo());
      thunkApi.dispatch(getCart());
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

export const logout = createAsyncThunk(
  'logout',
  async () => {
    return await authApi.logout();
  }
);

export const addAddress = createAsyncThunk(
  'addAddress',
  async (data) => {
    const { customerId, ...rest } = data;
    return await authApi.addAddress(customerId, rest);
  }
);

export const updateAddress = createAsyncThunk(
  'updateAddress',
  async (data) => {
    const { customerId, id, ...rest } = data;
    return await authApi.updateAddress(customerId, id, rest);
  }
);

export const deleteAddress = createAsyncThunk(
  'deleteAddress',
  async (data) => {
    const { customerId, id } = data;
    return await authApi.deleteAddress(customerId, id);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.setItem('accessToken', null);
      state.user = null;
      state.isAuthenticated = false;
      state.getCurrentUserStatus = ACTION_STATUS.IDLE;
      state.loginStatus = ACTION_STATUS.IDLE;
      state.registerStatus = ACTION_STATUS.IDLE;
      state.statusCode = null;
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
        } else {
          state.isAuthenticated = false;
          state.user = null;
          state.statusCode = action.payload.statusCode;
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


      .addCase(logout.pending, (state) => {
        state.logoutStatus = ACTION_STATUS.LOADING;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutStatus = ACTION_STATUS.SUCCEEDED;
        localStorage.setItem('accessToken', null);
        state.user = null;
        state.isAuthenticated = false;
        state.getCurrentUserStatus = ACTION_STATUS.IDLE;
        state.loginStatus = ACTION_STATUS.IDLE;
        state.registerStatus = ACTION_STATUS.IDLE;
        state.statusCode = null;
      })
      .addCase(logout.rejected, (state) => {
        state.logoutStatus = ACTION_STATUS.FAILED;
        localStorage.setItem('accessToken', null);
        state.user = null;
        state.isAuthenticated = false;
        state.getCurrentUserStatus = ACTION_STATUS.IDLE;
        state.loginStatus = ACTION_STATUS.IDLE;
        state.registerStatus = ACTION_STATUS.IDLE;
        state.statusCode = null;
      })


      .addCase(addAddress.pending, (state) => {
        state.addAddressStatus = ACTION_STATUS.LOADING;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addAddressStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.user.addresses ??= [];
          state.user.addresses.push(action.payload.data);
        }
      })
      .addCase(addAddress.rejected, (state) => {
        state.addAddressStatus = ACTION_STATUS.FAILED;
      })

      .addCase(updateAddress.pending, (state) => {
        state.updateAddressStatus = ACTION_STATUS.LOADING;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.updateAddressStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          if (!state.user.addresses) {
            state.user.addresses = [];
            state.user.addresses.push(action.payload.data);

            return;
          }

          state.user.addresses = state.user.addresses.map(address => ({ ...address, isDefault: false }));
          const index = state.user.addresses.findIndex(address => address.id === action.payload.data.id);
          state.user.addresses[index] = action.payload.data;
        }
      })
      .addCase(updateAddress.rejected, (state) => {
        state.updateAddressStatus = ACTION_STATUS.FAILED;
      })


      .addCase(deleteAddress.pending, (state) => {
        state.deleteAddressStatus = ACTION_STATUS.LOADING;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.deleteAddressStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.user.addresses = state.user.addresses.filter(address => address.id !== action.payload.data.id);
        }
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.deleteAddressStatus = ACTION_STATUS.FAILED;
      })
  }
});

const { reducer } = authSlice;

export default reducer;
