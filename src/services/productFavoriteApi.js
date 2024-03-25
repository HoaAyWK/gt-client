import axiosClient from './axios';

class ProductFavoriteApi {
  getMyFavorites = () => {
    const url = '/favorite/my';

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/favorite/api';

    return axiosClient.post(url, data);
  };

  delete = (id) => {
    const url = `/favorite/remove/${id}`;

    return axiosClient.delete(url);
  };
}

export default new ProductFavoriteApi();
