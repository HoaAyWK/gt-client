import { axiosClient } from './axios';

class CheckoutApi {
  checkoutWithCash = (data) => {
    const url = '/api/orders';

    return axiosClient.post(url, data);
  };

  checkoutWithStripe = (data) => {
    const url = '/api/stripe';

    return axiosClient.post(url, data);
  }
}


export default new CheckoutApi();
