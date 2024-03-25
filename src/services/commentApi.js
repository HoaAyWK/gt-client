import axiosClient from './axios/axiosClient';

class CommentApi {
  getByProduct = (productId, num, page, sortByNewest) => {
    const url = `/comment/product/${productId}?page=${page}&num=${num}&sortByNewest=${sortByNewest}`;

    return axiosClient.get(url);
  };

  create = (data) => {
    const url = '/comment/api';

    return axiosClient.post(url, data);
  };

  edit = (data) => {
    const url = '/comment/edit';

    return axiosClient.put(url, data);
  }
};

export default new CommentApi;
