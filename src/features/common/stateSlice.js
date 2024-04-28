import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import ACTION_STATUS from '../../constants/actionStatus';
import addressApi from '../../services/addressApi';
import { refresh } from './cartSlice';

const stateAdapter = createEntityAdapter();

const initialState = stateAdapter.getInitialState({
  getStatesStatus: ACTION_STATUS.IDLE,
});

export const getStates = createAsyncThunk(
  'state/getStates',
  async (countryId) => {
    return await addressApi.getStates(countryId);
  }
);

const stateSlice = createSlice({
  name: 'states',
  initialState,
  reducers: {
    refreshStates: (state) => {
      state.getStatesStatus = ACTION_STATUS.IDLE;
      stateAdapter.removeAll(state);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStates.pending, (state) => {
        state.getStatesStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getStates.fulfilled, (state, action) => {
        state.getStatesStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          console.log(action.payload.data);
          stateAdapter.setAll(state, action.payload.data);
        }
      })
      .addCase(getStates.rejected, (state) => {
        state.getStatesStatus = ACTION_STATUS.FAILED;
      });
  }
});

const { reducer, actions } = stateSlice;

export const { refreshStates } = actions;

export const {
  selectAll: selectAllStates,
  selectById: selectStatesById,
} = stateAdapter.getSelectors((state) => state.states);

export default reducer;
