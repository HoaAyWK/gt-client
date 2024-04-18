import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ACTION_STATUS from '../../constants/actionStatus';
import searchApi from '../../services/searchApi';

let initialState = {
  indexSettings: {},
  getIndexSettingsStatus: ACTION_STATUS.IDLE,
};

export const getAlgoliaIndexSettings = createAsyncThunk(
  'search/getIndexSettings',
  async () => {
    const data = await searchApi.getAlgoliaIndexSettings();

    console.log(data);

    return data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlgoliaIndexSettings.pending, (state) => {
        state.getIndexSettingsStatus = ACTION_STATUS.PENDING;
      })
      .addCase(getAlgoliaIndexSettings.fulfilled, (state, action) => {
        state.getIndexSettingsStatus = ACTION_STATUS.SUCCESS;

        if (action.payload.success) {
          state.indexSettings = action.payload.data;
        }
      })
      .addCase(getAlgoliaIndexSettings.rejected, (state) => {
        state.getIndexSettingsStatus = ACTION_STATUS.FAILED;
      })
  }
});

const { reducer } = searchSlice;

export default reducer;
