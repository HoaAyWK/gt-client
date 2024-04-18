import axiosClient from './axios';

class SearchApi {
  getAlgoliaIndexSettings = () => {
    const url = '/api/search/algolia/index-settings';

    return axiosClient.get(url);
  }
};

export default new SearchApi();
