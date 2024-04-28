import { axiosClient } from './axios';

class BannerApi {
  getAll = () => {
    const url = '/banner/show';

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/banner/api';

    return axiosClient.post(url, data);
  };

  delete = (id) => {
    const url = `/banner/${id}`;

    return axiosClient.delete(url);
  };
}

export default new BannerApi();
