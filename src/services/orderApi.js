import { axiosClient } from './axios';

class OrderApi {
  getOrderStatues = () => {
    const url = '/api/orders/statuses';

    return axiosClient.get(url);
  };

  getOrders = (page, pageSize, status) => {
    const url = `/api/orders/my?page=${page}&pageSize=${pageSize}&status=${status}&order=desc&orderBy=createdDateTime`;

    return axiosClient.get(url);
  };

  getOrder = (id) => {
    const url = `/api/orders/${id}`;

    return axiosClient.get(url);
  };

  confirmOrderReceived = (id) => {
    const url = `/api/orders/${id}/confirm-received`;

    return axiosClient.put(url, {});
  };

  getOrdersByProductIdAndProductVariantId = (productId, productVariantId) => {
    let url = `/api/orders/specific-product?productId=${productId}`;

    if (productVariantId) {
      url += `&productVariantId=${productVariantId}`;
    }

    return axiosClient.get(url);
  };

  cancelOrder = (id) => {
    const url = `/api/orders/${id}/cancel`;

    return axiosClient.put(url, {});
  };
};

export default new OrderApi();
