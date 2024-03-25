import axiosClient from './axios';

class ProductReviewApi {
  getProductReviewsByProductId = (id) => {
    const url = `/review/product/${id}`;

    return axiosClient.get(url);
  };

  createrProductReview = (data) => {
    const url = '/review/api';

    return axiosClient.post(url, data);
  };

  edit = (data) => {
    const url = 'review/edit';

    return axiosClient.put(url, data);
  };
}

export default new ProductReviewApi();
