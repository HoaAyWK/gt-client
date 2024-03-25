import axiosClient from './axios';

class ProductDetailsApi {
  getAll = () => {
    const url = '/detail/show';

    return axiosClient.get(url);
  };

  getBestSellers = (num = 8, page = 1) => {
    const url = `/detail/best-seller?num=${num}&page=${page}`;

    return axiosClient.get(url);
  };

  getProductsPerCategory = () => {
    const url = 'detail/products-per-category';

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/detail/save';

    return axiosClient.post(url, data);
  };

  update = (data) => {
    const url = '/detail/edit';

    return axiosClient.put(url, data);
  };

  getSingle = (id) => {
    const url = `/detail/single/${id}`;

    return axiosClient.get(url);
  };

  delete = (id) => {
    const url = `/detail/delete/${id}`;

    return axiosClient.delete(url);
  };
};

export default new ProductDetailsApi();
