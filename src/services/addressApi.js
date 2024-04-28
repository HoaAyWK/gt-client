import { axiosAddressClient } from './axios';

class AddressApi {
  getCountries = () => {
    const url = '/countries';
    return axiosAddressClient.get(url);
  };

  getStates = (countryId) => {
    const url = `/states?country_id=${countryId}&sortBy=name`;
    return axiosAddressClient.get(url);
  };
}

const addressApi = new AddressApi();

export default addressApi;
