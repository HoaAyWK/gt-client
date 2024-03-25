import axiosClient from './axios';

class CategoryApi {
  getAll = () => {
    const url = '/category/api';

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/category/api';

    return axiosClient.post(url, data);
  };

  update = (data) => {
    const url = `/category/api`;

    return axiosClient.put(url, data);
  };

  delete = (id) => {
    const url = `/category/delete/${id}`;

    return axiosClient.delete(url);
  };
};

export default new CategoryApi();
