import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../../../constants/actionStatus';
import commentApi from '../../../../services/commentApi';

const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState({
  getCommentsByProductStatus: ACTION_STATUS.IDLE,
  createCommentStatus: ACTION_STATUS.IDLE,
  editCommentStatus: ACTION_STATUS.IDLE,
  totalPage: 0,
  totalItems: 0,
});

export const getCommentsByProduct = createAsyncThunk(
  'comments/product',
  async ({ productId, num, page, sortByNewest }) => {
    if (!sortByNewest) {
      sortByNewest = false;
    }
    return await commentApi.getByProduct(productId, num, page, sortByNewest);
  }
);

export const createComment = createAsyncThunk(
  'comments/create',
  async (data) => {
    return await commentApi.create(data);
  }
);

export const editComment = createAsyncThunk(
  'comments/edit',
  async (data) => {
    return await commentApi.edit(data);
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    refresh: (state) => {
      commentsAdapter.setAll(state, []);
      state.createCommentStatus = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder



      .addCase(getCommentsByProduct.pending, (state) => {
        state.getCommentsByProductStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getCommentsByProduct.fulfilled, (state, action) => {
        state.getCommentsByProductStatus = ACTION_STATUS.SUCCEEDED;
        state.totalPage = action.payload.totalPage;
        state.totalItems = action.payload.totalItems;
        commentsAdapter.addMany(state, action.payload.comments);
      })
      .addCase(getCommentsByProduct.rejected, (state) => {
        state.getCommentsByProductStatus = ACTION_STATUS.FAILED;
      })



      .addCase(createComment.pending, (state) => {
        state.createCommentStatus = ACTION_STATUS.IDLE;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.createCommentStatus = ACTION_STATUS.SUCCEEDED;
        const comment = action.payload;

        if (comment.reply) {
          state.entities[action.payload.reply]?.replies?.push(comment);
        } else {
          commentsAdapter.addOne(state, comment);
        }
      })
      .addCase(createComment.rejected, (state) => {
        state.createCommentStatus = ACTION_STATUS.FAILED;
      })


      .addCase(editComment.pending, (state) => {
        state.editCommentStatus = ACTION_STATUS.IDLE;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.editCommentStatus = ACTION_STATUS.SUCCEEDED;
        const comment = action.payload.comment;

        if (comment.reply) {
          let position = -1;
          state.entities[comment.reply]?.replies?.forEach((rep, index) => {
            if (rep.id === comment.id) {
              position = index;
            }
          });

          if (position !== -1) {
            if (state.entities?.[comment.reply]?.replies?.[position]) {
              state.entities[comment.reply].replies[position] = comment;
            }
          }
        } else {
          const { id, ...data } = comment;
          commentsAdapter.updateOne(state, { id, changes: data });
        }
      })
      .addCase(editComment.rejected, (state) => {
        state.editCommentStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllComments
} = commentsAdapter.getSelectors(state => state.comments);

const { reducer, actions } = commentSlice;

export const { refresh } = actions;

export default reducer;

