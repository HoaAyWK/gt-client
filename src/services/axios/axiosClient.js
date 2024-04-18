// api/axiosClient.js
import axios from "axios";
// import queryString from "query-string";

import { API_URL } from '../../constants/api';

// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
      "content-type": "application/json",
  },
  withCredentials: true
  // paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = JSON.parse(localStorage.getItem('accessToken'));

  if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
  }


  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
        return { data: { ...response.data }, success: true };
    }
    return { data: { ...response }, success: true };
  },
  (error) => {
    console.log(error);
    const validationErrors = (error.response && error.response.data && error.response.data.errors) ?? null;
    const singleError =  (error.response && error.response.data && error.response.data.title)
      || error.message || error.toString();

    const statusCode = error.response && error.response.status;

    return { success: false, statusCode, error: singleError, errors: validationErrors };
  }
);

export default axiosClient;
