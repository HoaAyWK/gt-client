import axiosClient from './axios';

class ShippingAddressApi {
  getMyShippingAddresses = () => {
    const url = '/delivery/my';

    return axiosClient.get(url);
  };

  add = (data) => {
    const url = '/delivery/add';

    return axiosClient.post(url, data);
  };

  delete = (id) => {
    const url = `/delivery/${id}`;

    return axiosClient.delete(url);
  }
}

export default new ShippingAddressApi();
