import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import ACTION_STATUS from '../../constants/actionStatus';
import categoryApi from '../../services/categoryApi';

const categoryAdapter = createEntityAdapter();

const initialState = categoryAdapter.getInitialState({
  getCategoryTreeStatus: ACTION_STATUS.IDLE,
  getCategoryBySlugStatus: ACTION_STATUS.IDLE,
  category: null
});

export const getCategoryTree = createAsyncThunk(
  'category/getTree',
  async () => {
    return await categoryApi.getCategoryTree();
  }
);

export const getCategoryBySlug = createAsyncThunk(
  'category/getBySlug',
  async (slug) => {
    return await categoryApi.getCategoryBySlug(slug);
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryTree.pending, (state) => {
        state.getCategoryTreeStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getCategoryTree.fulfilled, (state, action) => {
        state.getCategoryTreeStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          categoryAdapter.setAll(state, action.payload.data);
        }
      })
      .addCase(getCategoryTree.rejected, (state) => {
        state.getCategoryTreeStatus = ACTION_STATUS.FAILED;
      })


      .addCase(getCategoryBySlug.pending, (state) => {
        state.getCategoryBySlugStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getCategoryBySlug.fulfilled, (state, action) => {
        state.getCategoryBySlugStatus = ACTION_STATUS.SUCCEEDED;

        if (action.payload.success) {
          state.category = action.payload.data;
        }
      })
      .addCase(getCategoryBySlug.rejected, (state) => {
        state.getCategoryBySlugStatus = ACTION_STATUS.FAILED;
      })
  },
});

const { reducer } = categorySlice;

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoriesById,
} = categoryAdapter.getSelectors((state) => state.categories);

export default reducer;
