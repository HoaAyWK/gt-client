import axiosClient from './axios';

class AccountApi {
  updateAccount = (data) => {
    const url = '/user/api';

    return axiosClient.put(url, data);
  };

  changePassword = (data) => {
    const url = '/account/api';

    return axiosClient.put(url, data);
  };

}

export default new AccountApi();
