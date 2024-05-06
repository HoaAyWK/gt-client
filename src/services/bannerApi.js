import { axiosClient } from './axios';

class BannerApi {
  getBanners = (params) => {
    const { page, pageSize, order, orderBy } = params;
    const url = `/api/banners?page=${page}&pageSize=${pageSize}&order=${order}&orderBy=${orderBy}`;

    return axiosClient.get(url);
  };
}

export default new BannerApi();
