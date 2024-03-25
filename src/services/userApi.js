import axiosClient from './axios';

class UserApi {
  getAll = () => {
    const url = '/user/admin';

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/user/api';

    return axiosClient.post(url, data);
  };

  update = (data) => {
    const url = `/user/api`;

    return axiosClient.put(url, data);
  };

  delete = (id) => {
    const url = `/users/${id}`;

    return axiosClient.delete(url);
  };
};

export default new UserApi();
