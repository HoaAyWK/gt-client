import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../constants/actionStatus';
import notificationApi from '../../services/notificationApi';

const notificationAdapter = createEntityAdapter();

const initialState = notificationAdapter.getInitialState({
  getNotificationsStatus: ACTION_STATUS.IDLE,
  markAllNotificationsAsReadStatus: ACTION_STATUS.IDLE,
  markNotificationAsReadStatus: ACTION_STATUS.IDLE,
  hubConnection: null,
});

export const getNotifications = createAsyncThunk(
  'notifications/getNotifications',
  async () => {
    return await notificationApi.getNotifications();
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  'notifications/markAllNotificationsAsRead',
  async () => {
    return await notificationApi.markAllNotificationsAsRead();
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markNotificationAsRead',
  async (notificationId) => {
    return await notificationApi.markNotificationAsRead(notificationId);
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setHubConnection: (state, action) => {
      state.hubConnection = action.payload;
    },
    addNewNotification: (state, action) => {
      notificationAdapter.addOne(state, action.payload);
    }
  },
  extraReducers: (builder) => {


    builder.addCase(getNotifications.pending, (state) => {
      state.getNotificationsStatus = ACTION_STATUS.PENDING;
    })
    .addCase(getNotifications.fulfilled, (state, action) => {
      notificationAdapter.setAll(state, action.payload);

      if (action.payload.success) {
        notificationAdapter.setAll(state, action.payload.data);
      }

      state.getNotificationsStatus = ACTION_STATUS.SUCCEEDED;
    })
    .addCase(getNotifications.rejected, (state) => {
      state.getNotificationsStatus = ACTION_STATUS.FAILED;
    })


    builder.addCase(markAllNotificationsAsRead.pending, (state) => {
      state.getNotificationsStatus = ACTION_STATUS.PENDING;
    })
    .addCase(markAllNotificationsAsRead.fulfilled, (state, action) => {
      if (action.payload.success) {
        notificationAdapter.setAll(state, action.payload.data);
      }

      state.getNotificationsStatus = ACTION_STATUS.SUCCEEDED;
    })
    .addCase(markAllNotificationsAsRead.rejected, (state) => {
      state.getNotificationsStatus = ACTION_STATUS.FAILED;
    })


    .addCase(markNotificationAsRead.pending, (state) => {
      state.markNotificationAsReadStatus = ACTION_STATUS.PENDING;
    })
    .addCase(markNotificationAsRead.fulfilled, (state, action) => {
      if (action.payload.success) {
        const { id, ...data } = action.payload.data;
        notificationAdapter.updateOne(state, { id, changes: data });
      }

      state.markNotificationAsReadStatus = ACTION_STATUS.SUCCEEDED;
    })
    .addCase(markNotificationAsRead.rejected, (state) => {
      state.markNotificationAsReadStatus = ACTION_STATUS.FAILED;
    })
  }
});

export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationById,
  selectIds: selectNotificationIds,
} = notificationAdapter.getSelectors((state) => state.notifications);


const { reducer, actions } = notificationSlice;

export const { setHubConnection, addNewNotification } = actions;

export default reducer;
