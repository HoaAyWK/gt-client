import * as signalR from '@microsoft/signalr';

import { API_URL, NOTIFICATIONS_HUB } from '../../constants/api';

const createNotificationsHub = (token) => new signalR.HubConnectionBuilder()
  .withUrl(`${API_URL}/${NOTIFICATIONS_HUB}`, {
    accessTokenFactory: () => token
  })
  .configureLogging(signalR.LogLevel.Information)
  .build();

export default createNotificationsHub;
