import { axiosClient } from './axios';

class ProductApi {
  getAll = () => {
    const url = '/api/products';

    return axiosClient.get(url);
  };

  getProduct = (id) => {
    const url = `/api/products/${id}`;

    return axiosClient.get(url);
  };

  addReview = (id, data) => {
    const url = `/api/products/${id}/reviews`;

    return axiosClient.post(url, data);
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
