import { axiosClient } from './axios';

class AuthApi {
  login = (data) => {
    const url = '/api/auth/login';
    return axiosClient.post(url, data);
  };

  register = (data) => {
    const url = '/api/auth/register';
    return axiosClient.post(url, data);
  };

  getCurrentUserInfo = () => {
    const url = '/api/account/my-profile';
    return axiosClient.get(url);
  };

  logout = () => {
    const url = '/api/auth/logout';
    return axiosClient.get(url);
  };

  sendConfirmationEmail = (data) => {
    const url = `/api/auth/send-confirmation-email`;

    return axiosClient.post(url, data);
  };

  verifyEmail = (data) => {
    const url = `/api/auth/verify-email`;

    return axiosClient.post(url, data);
  };

  forgetPassword = (data) => {
    const url = '/api/auth/forget-password';

    return axiosClient.post(url, data);
  };

  resetPassword = (data) => {
    const url = '/api/auth/reset-password';

    return axiosClient.post(url, data);
  };

  addAddress = (id, data) => {
    const url = `/api/customers/${id}/addresses`;

    return axiosClient.post(url, data);
  };

  updateAddress = (customerId, addressId, data) => {
    const url = `/api/customers/${customerId}/addresses/${addressId}`;

    return axiosClient.put(url, data);
  };

  deleteAddress = (customerId, addressId) => {
    const url = `/api/customers/${customerId}/addresses/${addressId}`;

    return axiosClient.delete(url);
  };
}

const authApi = new AuthApi();

export default authApi;
