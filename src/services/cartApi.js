import axiosClient from './axios/axiosClient';

class CartApi {
  get = () => {
    let url = '/api/carts/my';

    return axiosClient.get(url);
  };

  addToCart = (item) => {
    const url = '/api/carts';

    return axiosClient.put(url, item);
  };

  checkItem = (data) => {
    const url = '/cart/check-item';

    return axiosClient.put(url, data);
  };

  checkAll = (data) => {
    const url = '/cart/check-all';

    return axiosClient.put(url, data);
  };

  removeFromCart = (data) => {
    const url = '/cart/remove-item';

    return axiosClient.put(url, data);
  };

  removeMultiFromCart = (data) => {
    const url = '/cart/remove-multi-items';

    return axiosClient.put(url, data);
  };

  decreaseByOne = (itemId) => {
    const url = '/cart';

    return axiosClient.put(url, itemId);
  };
};

export default new CartApi();
