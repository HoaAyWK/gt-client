import axiosClient from './axios';

class ProductApi {
  getAll = () => {
    const url = '/products';

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/products';

    return axiosClient.post(url, data);
  };

  update = (id, data) => {
    const url = `/products/${id}`;

    return axiosClient.put(url, data);
  };

  delete = (id) => {
    const url = `/products/${id}`;

    return axiosClient.delete(url);
  };
};

export default new ProductApi();
