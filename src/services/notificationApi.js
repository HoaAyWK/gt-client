import { axiosClient } from './axios';

class NotificationApi {
  getNotifications = () => {
    const url = `/api/notifications/my`;

    return axiosClient.get(url);
  };

  markAllNotificationsAsRead = () => {
    const url = `/api/notifications/mark-all-as-read`;

    return axiosClient.put(url);
  };

  markNotificationAsRead = (id) => {
    const url = `/api/notifications/${id}/mark-as-read`;

    return axiosClient.put(url);
  }
}

export default new NotificationApi();
