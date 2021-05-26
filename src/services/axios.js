import Axios from "axios";
import qs from "qs";
const api = Axios.create({
  baseURL: "http://localhost:3001",
  timeout: 30000,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "brackets" });
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["X-CMC_PRO_API_KEY"] =
      "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c";
    // let authenticatedUser = Store.getState().authenticatedUser;
    // if (authenticatedUser) {
    //   config.headers["Authorization"] = "Bearer " + authenticatedUser.token;
    // }
    config.params = config.params || {};
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
