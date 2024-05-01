import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  hubConnection: null
};


const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setHubConnection: (state, action) => {
      state.hubConnection = action.payload;
    }
  },
  extraReducers: (builder) => {

  }
});

const { reducer, actions } = notificationSlice;

export const { setHubConnection } = actions;

export default reducer;
