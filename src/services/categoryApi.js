import { axiosClient } from './axios';

class CategoryApi {
  getAll = () => {
    const url = '/category/api';

    return axiosClient.get(url);
  };

  getCategoryTree = () => {
    const url = '/api/categories/tree';

    return axiosClient.get(url);
  };

  getCategoryBySlug = (slug) => {
    const url = `/api/categories/slugs/${slug}`;

    return axiosClient.get(url);
  }
};

export default new CategoryApi();
