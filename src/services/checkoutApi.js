import axiosClient from './axios';

class CheckoutApi {
  checkoutWithCash = (data) => {
    const url = '/order/add';

    return axiosClient.post(url, data);
  };

  checkoutWithStripe = (data) => {
    const url = '/order/credit';

    return axiosClient.post(url, data);
  }
}


export default new CheckoutApi();
