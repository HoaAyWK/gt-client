import { axiosClient } from './axios';

class BrandApi {
  getAll = () => {
    const url = '/distributor/api';

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/distributor/api';

    return axiosClient.post(url, data);
  };

  update = (id, data) => {
    const url = `/brands/${id}`;

    return axiosClient.put(url, data);
  };

  delete = (id) => {
    const url = `/distributor/delete/${id}`;

    return axiosClient.delete(url);
  };
};

export default new BrandApi();
