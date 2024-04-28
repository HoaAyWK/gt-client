// api/axiosClient.js
import axios from "axios";
// import queryString from "query-string";

import { ADDRESS_API_URL } from '../../constants/api';

// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs

const axiosClient = axios.create({
  baseURL: ADDRESS_API_URL,
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST
  }
});

axiosClient.interceptors.request.use(async (config) => {
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
