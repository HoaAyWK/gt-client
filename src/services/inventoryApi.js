import axiosClient from './axios';

class InventoryApi {
  getAll = () => {
    const url = '/warehouse/show';

    return axiosClient.get(url);
  };

  getWarehouseHistory = (productId) => {
    const url = `/warehouse/history/${productId}`;

    return axiosClient.get(url);
  };

  update = (id, data) => {
    const url = `/inventories/${id}`;

    return axiosClient.put(url, data);
  };

};

export default new InventoryApi();
