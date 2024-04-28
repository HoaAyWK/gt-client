import { STATUS } from '../constants/orderStatus';
import { axiosClient } from './axios';

class OrderApi {
  getAll = () => {
    const url = '/bill/show';

    return axiosClient.get(url);
  };

  getMyBill = (status = STATUS.ALL, num = 5, page = 1) => {
    const url = `/bill/my-bills?status=${status}&num=${num}&page=${page}`;

    return axiosClient.get(url);
  };

  getSingle = (id) => {
    const url = `/bill/${id}`;

    return axiosClient.get(url);
  };

  cancel = (id) => {
    const url = 'bill/edit';
    const data = { id, status: STATUS.CANCELLED };

    return axiosClient.put(url, data);
  };

  create = (data) => {
    const url = '/bill';

    return axiosClient.post(url, data);
  };

  update = (data) => {
    const url = `/bill/edit`;

    return axiosClient.put(url, data);
  };

  delete = (id) => {
    const url = `/orders/${id}`;

    return axiosClient.delete(url);
  };

  getOrderStatues = () => {
    const url = '/api/orders/statuses';

    return axiosClient.get(url);
  };

  getOrders = (page, pageSize, status) => {
    const url = `/api/orders/my?page=${page}&pageSize=${pageSize}&status=${status}`;

    return axiosClient.get(url);
  }
};

export default new OrderApi();
