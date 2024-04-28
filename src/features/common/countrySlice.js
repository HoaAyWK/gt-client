import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import ACTION_STATUS from '../../constants/actionStatus';
import addressApi from '../../services/addressApi';

const countryAdapter = createEntityAdapter();

const initialState = countryAdapter.getInitialState({
  getCountriesStatus: ACTION_STATUS.IDLE,
});

export const getCountries = createAsyncThunk(
  'country/getCountries',
  async () => {
    return await addressApi.getCountries();
  }
);

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.getCountriesStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.getCountriesStatus = ACTION_STATUS.SUCCEEDED;
        if (action.payload.success) {
          console.log(action.payload.data)
          countryAdapter.setAll(state, action.payload.data);
        }
      })
      .addCase(getCountries.rejected, (state) => {
        state.getCountriesStatus = ACTION_STATUS.FAILED;
      })
  }
});

const { reducer } = countrySlice;

export const {
  selectAll: selectAllCountries,
  selectById: selectCountriesById,
} = countryAdapter.getSelectors((state) => state.countries);

export default reducer;
